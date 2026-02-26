import { Interface, encodeBytes32String } from "ethers";
import { FACTORY_ABI } from "./abis.js";

// Create factory interface for encoding
const factoryInterface = new Interface(FACTORY_ABI);

// Temporary owner, will be set to the PauseProxy on the end of script execution.
const OWNER_ADDRESS = "0xD0A99a2610671c6758cFCe21C990992B9e5f0647";

// From: https://github.com/security-alliance/safe-harbor?tab=readme-ov-file#registry-addresses
const REGISTRY_ADDRESS = "0x1eaCD100B0546E433fbf4d773109cAD482c34686";
const CHAIN_VALIDATOR_ADDRESS = "0xd01C76ccE414d9B0a294abAFD94feD2e0B88675D"

// Values on the Atlas Edit WIP
const PROTOCOL_NAME = "Sky";
const AGREEMENT_URI = "https://bafkreiernns2f4nv2uzvwtzjc2jboyivsu2mixz33y3xo7cvtllsuao6jy.ipfs.w3s.link/";
const CONTACT_DETAILS = {
    name: "Sky",
    contact: "safeharbor@skyeco.com",
};
const BOUNTY_TERMS = {
    bountyPercentage: 10,
    bountyCapUSD: 10000000,
    retainable: false,
    identity: 2,
    diligenceRequirements:
        "KYC and Sanctions Screening. Sky and Stars require all eligible whitehats to undergo Know Your Customer (KYC) verification and be screened against global sanctions lists, including OFAC, UK, and EU regulations. This ensures that bounty recipients meet legal and regulatory standards before qualifying for payment. The verification process shall be conducted by a trusted third-party provider at Sky and Stars discretion, and all data is deleted, if successful, within 30 days post-verification.",
    aggregateBountyCapUSD: 10000000,
}

// Helper function to generate deployment payload with empty chains
async function generateDeploymentPayload() {
    try {
        // Create empty details structure
        const emptyDetails = {
            protocolName: PROTOCOL_NAME,
            contactDetails: [CONTACT_DETAILS],
            chains: [], // Empty chains array - will be populated later
            bountyTerms: BOUNTY_TERMS,
            agreementURI: AGREEMENT_URI
        };

        // Generate the deployment payload
        const deploymentPayload = {
            function: "create",
            args: [emptyDetails, CHAIN_VALIDATOR_ADDRESS, OWNER_ADDRESS, encodeBytes32String("2")],
            calldata: factoryInterface.encodeFunctionData("create", [
                emptyDetails,
                CHAIN_VALIDATOR_ADDRESS,
                OWNER_ADDRESS,
                encodeBytes32String("1")
            ])
        };

        console.log("\nDeployment Payload:");
        console.log(JSON.stringify(deploymentPayload, null, 2));

        return deploymentPayload;
    } catch (error) {
        console.error("Error generating deployment payload:", error);
        throw error;
    }
}

// Only run if this file is being executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    generateDeploymentPayload();
}
