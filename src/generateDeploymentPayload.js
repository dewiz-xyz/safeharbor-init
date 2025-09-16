import { Interface } from "ethers";
import { FACTORY_ABI } from "./abis.js";

// Create factory interface for encoding
const factoryInterface = new Interface(FACTORY_ABI);

// Temporary owner, will be set to the PauseProxy on the end of script execution.
const OWNER_ADDRESS = "0x195a7d8610edd06e0C27c006b6970319133Cb19A";

// From: https://github.com/security-alliance/safe-harbor?tab=readme-ov-file#registry-addresses
const REGISTRY_ADDRESS = "0x1eaCD100B0546E433fbf4d773109cAD482c34686";

// Values on the Atlas Edit WIP
const PROTOCOL_NAME = "Sky";
const AGREEMENT_URI = "TODO"; // TODO
const CONTACT_DETAILS = {
    name: "",
    contact: "safeharbor@sky.money",
};
const BOUNTY_TERMS = {
    bountyPercentage: 10000000, // 10%
    bountyCapUSD: 0,
    retainable: false,
    identity: 2,
    diligenceRequirements:
        "KYC and Sanctions Screening. Sky and Stars require all eligible whitehats to undergo Know Your Customer (KYC) verification and be screened against global sanctions lists, including OFAC, UK, and EU regulations. This ensures that bounty recipients meet legal and regulatory standards before qualifying for payment. The verification process shall be conducted by a trusted third-party provider at Sky and Stars discretion, and all data is deleted, if successful, within 30 days post-verification.",
    aggregateBountyCapUSD: 10000000,  // TODO: Add once legal answers with a value
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
            args: [emptyDetails, REGISTRY_ADDRESS, OWNER_ADDRESS],
            calldata: factoryInterface.encodeFunctionData("create", [
                emptyDetails,
                REGISTRY_ADDRESS,
                OWNER_ADDRESS
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
