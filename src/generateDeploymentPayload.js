import { ethers } from "ethers";
import { FACTORY_ABI } from "./abis.js";
import { REGISTRY_ADDRESS, OWNER_ADDRESS } from "./constants.js";

// Create factory interface for encoding
const factoryInterface = new ethers.utils.Interface(FACTORY_ABI);

export const PROTOCOL_NAME = "Sky";
export const AGREEMENT_URI = "Agreement URI";
export const CONTACT_DETAILS = {
    name: "",
    contact: "safeharbor@sky.money",
};
export const BOUNTY_TERMS = {
    bountyPercentage: 10000000, // 10%
    bountyCapUSD: 0,
    retainable: false,
    identity: 2,
    diligenceRequirements:
        "KYC and Sanctions Screening. Sky and Stars require all eligible whitehats to undergo Know Your Customer (KYC) verification and be screened against global sanctions lists, including OFAC, UK, and EU regulations. This ensures that bounty recipients meet legal and regulatory standards before qualifying for payment. The verification process shall be conducted by a trusted third-party provider at Sky and Stars discretion, and all data is deleted, if successful, within 30 days post-verification.",
    aggregateBountyCapUSD: 0,
}

// Helper function to generate deployment payload with empty chains
export async function generateDeploymentPayload() {
    try {
        // Create empty details structure
        const emptyDetails = {
            protocolName: PROTOCOL_NAME, // Update with actual protocol name
            contactDetails: [CONTACT_DETAILS],
            chains: [], // Empty chains array - will be populated later
            bountyTerms: BOUNTY_TERMS,
            agreementURI: "ipfs://AFREEMENMET_URI" // Add your agreement URI
        };

        console.log("Registry Address", REGISTRY_ADDRESS);
        console.log("Owner Address", OWNER_ADDRESS);

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
