import { parse } from "csv-parse/sync";
import { Interface } from "ethers";
import { getChainId, getAssetRecoveryAddress } from "./chainUtils.js";
import { AGREEMENTV2_ABI } from "./abis.js";

const csvURL = "https://docs.google.com/spreadsheets/d/1e_KOYOeBGaA5EG3Xqco6lOP_a0zV4Vrm3w5-dqFk00U/export?format=csv&gid=1121763694";
const agreementInterface = new Interface(AGREEMENTV2_ABI);

/**
 * Downloads and parses CSV from a URL
 * @param {string} url - The CSV URL (e.g., Google Sheets export URL)
 * @returns {Promise<Array>} Parsed CSV records
 */
async function downloadAndParseCSV(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        // Basic validation that we got CSV data
        if (!response.headers.get("content-type")?.includes("text/csv")) {
            throw new Error(
                "Invalid content type. Expected CSV data. Please check the URL format."
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
                "\nThe URL might be incorrect. For Google Sheets, make sure to use the export URL format:"
            );
            console.error(
                "https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid={SHEET_ID}"
            );
        }
        throw error;
    }
}

/**
 * Normalizes CSV records into chains structure
 * @param {Array} records - Raw CSV records
 * @returns {Object} Normalized chains data
 */
function normalizeCSVRecords(records) {
    return records
        .filter((record) => record.Status === "ACTIVE")
        .reduce((chains, record) => {
            const chain = record.Chain;
            if (!chains[chain]) {
                chains[chain] = [];
            }

            // Handle both possible column names for factory flag
            const isFactory =
                record.isFactory === "TRUE" || record.IsFactory === "TRUE";

            chains[chain].push({
                accountAddress: record.Address,
                childContractScope: isFactory ? 2 : 0,
            });
            return chains;
        }, {});
}



/**
 * Generates the initial payload for the agreement contract
 * @param {string} csvUrl - URL to the CSV file
 * @returns {Promise<Object>} The encoded calldata and metadata for initialization
 */
export async function generateInitialPayload(csvUrl) {
    try {
        console.log("Downloading and parsing CSV...");
        const records = await downloadAndParseCSV(csvUrl);
        
        console.log("Normalizing CSV data...");
        const csvState = normalizeCSVRecords(records);
        
        console.log("Generating chain data...");
        const chainNames = Object.keys(csvState);
        
        if (chainNames.length === 0) {
            throw new Error("No active chains found in CSV");
        }

        // Build the chains array for addChains function
        const newChains = chainNames.map((chainName) => {
            const chainId = getChainId(chainName);
            const accounts = csvState[chainName] || [];

            // Validate accounts
            const problematicAccounts = accounts.filter(
                (acc) =>
                    !acc.accountAddress ||
                    acc.childContractScope === undefined ||
                    acc.childContractScope === null
            );
            
            if (problematicAccounts.length > 0) {
                throw new Error(
                    `Problematic accounts found in chain ${chainName}: ${JSON.stringify(problematicAccounts)}`
                );
            }

            return {
                assetRecoveryAddress: getAssetRecoveryAddress(chainName),
                accounts: accounts,
                caip2ChainId: chainId,
            };
        });

        console.log(`Generated ${newChains.length} chains with ${newChains.reduce((total, chain) => total + chain.accounts.length, 0)} total accounts`);

        // Encode the function call
        const calldata = agreementInterface.encodeFunctionData("addChains", [newChains]);

        console.log("Calldata:", calldata);

    } catch (error) {
        console.error("Error generating initial payload:", error);
        throw error;
    }
}

generateInitialPayload(csvURL);
