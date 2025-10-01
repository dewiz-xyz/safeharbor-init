import { parse } from "csv-parse/sync";
import { Interface } from "ethers";
import { AGREEMENTV2_ABI } from "./abis.js";

// --- Constants ---
const WORKBOOK_URL =
    "https://docs.google.com/spreadsheets/d/1e_KOYOeBGaA5EG3Xqco6lOP_a0zV4Vrm3w5-dqFk00U";
const CONTRACTS_IN_SCOPE_SHEET_URL = `${WORKBOOK_URL}/export?format=csv&gid=1121763694`;
const CHAIN_DETAILS_SHEET_URL = `${WORKBOOK_URL}/export?format=csv&gid=1620276618`;

const agreementInterface = new Interface(AGREEMENTV2_ABI);

/**
 * Downloads and parses CSV from a URL.
 * @param {string} url The CSV URL (e.g., Google Sheets export URL).
 * @returns {Promise<Array>} Parsed CSV records.
 */
async function downloadAndParseCSV(url) {
    console.warn(`Fetching CSV from ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        // Basic validation that we got CSV data
        if (!response.headers.get("content-type")?.includes("text/csv")) {
            throw new Error(
                "Invalid content type. Expected CSV data. Please check the URL format.",
            );
        }

        return parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });
    } catch (error) {
        console.error("Error downloading CSV:", error.message);
        if (error.message.includes("HTML")) {
            console.error(
                "\nThe URL might be incorrect. For Google Sheets, make sure to use the export URL format:",
            );
            console.error(
                "https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid={SHEET_ID}",
            );
        }
        throw error;
    }
}

/**
 * Fetches and normalizes chain details from the dedicated CSV.
 * @param {string} url - The URL for the chain details CSV.
 * @returns {Promise<Object>} An object containing chain detail mappings.
 */
async function getChainDetailsFromCSV(url) {
    const records = await downloadAndParseCSV(url);

    const caip2ChainId = {};
    const assetRecoveryAddress = {};
    const name = {};

    records.forEach((record) => {
        const chainName = record["Name"];
        const chainId = record["Chain Id"];
        const chainAssetRecoveryAddress = record["Asset Recovery Address"];

        if (chainName && chainId && chainAssetRecoveryAddress) {
            caip2ChainId[chainName] = chainId;
            assetRecoveryAddress[chainName] = chainAssetRecoveryAddress;
            name[chainId] = chainName;
        }
    });

    return { caip2ChainId, assetRecoveryAddress, name };
}

/**
 * Normalizes contract records from the CSV into a structured object.
 * @param {Array} records - Raw CSV records from the contracts sheet.
 * @returns {Object} Normalized chains data.
 */
function normalizeContractsInScope(records) {
    return records
        .filter((record) => record.Status === "ACTIVE")
        .reduce((chains, record) => {
            const chain = record.Chain;
            if (!chains[chain]) {
                chains[chain] = [];
            }

            // Handle both possible column names for the factory flag
            const isFactory =
                record.isFactory === "TRUE" || record.IsFactory === "TRUE";

            chains[chain].push({
                accountAddress: record.Address,
                childContractScope: isFactory ? 2 : 0,
            });
            return chains;
        }, {});
}

// --- Main Function ---

/**
 * Generates the initial payload for the agreement contract by fetching and processing data
 * from Google Sheets.
 * @returns {Promise<Object>} The encoded calldata and the structured chain data.
 */
export async function generateInitialPayload() {
    try {
        // 1. Fetch chain details from its dedicated sheet
        console.log("Fetching chain details CSV...");
        const chainDetails = await getChainDetailsFromCSV(CHAIN_DETAILS_SHEET_URL);
        const chainDetailsChainNames = Object.keys(chainDetails.caip2ChainId);

        // 2. Download and parse the main contracts in scope sheet
        console.log("Downloading and parsing contracts in scope CSV...");
        const records = await downloadAndParseCSV(CONTRACTS_IN_SCOPE_SHEET_URL);

        // 3. Normalize the contracts data into a per-chain structure
        console.log("Normalizing contract data...");
        const csvState = normalizeContractsInScope(records);

        // 4. Filter out chains that don't have complete details in the chain details sheet
        console.log("Validating and filtering chains...");
        const desiredChainNames = Object.keys(csvState);

        const validChainNames = desiredChainNames.filter((chainName) => {
            if (!chainDetailsChainNames.includes(chainName)) {
                console.warn(
                    `\n\n⚠️-----⚠️ \nSkipping chain with missing details: name='${chainName}' \nPlease add its details to the 'Chain Details' sheet to include it. \n⚠️-----⚠️\n\n`,
                );
                return false;
            }
            return true;
        });

        if (validChainNames.length === 0) {
            throw new Error("No active chains with complete details found. Halting.");
        }

        // 5. Build the final `chains` array for the `addChains` function
        const newChains = validChainNames.map((chainName) => {
            console.log(`Processing chain: ${chainName}`);
            const accounts = csvState[chainName] || [];

            // Validate that all account objects are well-formed
            const problematicAccounts = accounts.filter(
                (acc) =>
                    !acc.accountAddress || acc.childContractScope === undefined,
            );

            if (problematicAccounts.length > 0) {
                throw new Error(
                    `Problematic accounts found in chain ${chainName}: ${JSON.stringify(problematicAccounts)}`,
                );
            }

            return {
                assetRecoveryAddress: chainDetails.assetRecoveryAddress[chainName],
                accounts: accounts,
                caip2ChainId: chainDetails.caip2ChainId[chainName],
            };
        });

        console.log(`\nGenerated payload for ${newChains.length} chains with ${newChains.reduce((total, chain) => total + chain.accounts.length, 0)} total accounts.`);

        // 6. Encode the function call to get the final calldata
        const calldata = agreementInterface.encodeFunctionData("addChains", [
            newChains,
        ]);

        console.log("\n✅ --- Generated Calldata --- ✅");
        console.log(calldata);
        console.log("---------------------------------\n");

        return { calldata, newChains };
    } catch (error) {
        console.error("\n❌ Error generating initial payload:", error.message);
        throw error;
    }
}

// --- Script Execution ---
generateInitialPayload();
