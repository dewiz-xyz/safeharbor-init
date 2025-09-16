// TODO: Replace once incorporated on the sheet
export const ARBITRUM_ASSET_RECOVERY_ADDRESS =
    "0x10E6593CDda8c58a1d0f14C5164B376352a55f2F"; // GovRelay
export const BASE_ASSET_RECOVERY_ADDRESS =
    "0xdD0BCc201C9E47c6F6eE68E4dB05b652Bb6aC255"; // GovRelay
export const ETHEREUM_ASSET_RECOVERY_ADDRESS =
    "0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB"; // PauseProxy
export const SOLANA_ASSET_RECOVERY_ADDRESS =
    "STTUVCMPuNbk21y1J6nqEGXSQ8HKvFmFBKnCvKHTrWn"; // TODO: change to actual address
export const OPTIMISM_ASSET_RECOVERY_ADDRESS =
    "0x09b354cda89203bb7b3131cc728dfa06ab09ae2f"; // GovRelay
export const UNICHAIN_ASSET_RECOVERY_ADDRESS =
    "0xb383070cf9f4f01c3a2cfd0ef6da4bc057b429b7"; // GovRelay

// Chain ID mapping
export const CHAIN_IDS = {
    ETHEREUM: "eip155:1",
    BASE: "eip155:8453",
    GNOSIS: "eip155:100",
    ARBITRUM: "eip155:42161",
    SOLANA: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    OPTIMISM: "eip155:10",
    UNICHAIN: "eip155:130",
};

// Reverse mapping for chain ID to name
export const CHAIN_NAMES = Object.entries(CHAIN_IDS).reduce(
    (acc, [name, id]) => {
        acc[id] = name;
        return acc;
    },
    {},
);

// Get chain ID from chain name
export function getChainId(chain) {
    return CHAIN_IDS[chain] ?? "unknown:0";
}

// Get chain name from chain ID
export function getChainName(chainId) {
    return CHAIN_NAMES[chainId] ?? "UNKNOWN";
}

// Get asset recovery address for a chain
export function getAssetRecoveryAddress(chain) {
    switch (chain) {
        case "ETHEREUM":
            return ETHEREUM_ASSET_RECOVERY_ADDRESS;
        case "BASE":
            return BASE_ASSET_RECOVERY_ADDRESS;
        case "ARBITRUM":
            return ARBITRUM_ASSET_RECOVERY_ADDRESS;
        case "SOLANA":
            return SOLANA_ASSET_RECOVERY_ADDRESS;
        case "OPTIMISM":
            return OPTIMISM_ASSET_RECOVERY_ADDRESS;
        case "UNICHAIN":
            return UNICHAIN_ASSET_RECOVERY_ADDRESS;
        default:
            throw new Error(
                `No asset recovery address defined for chain: ${chain}`,
            );
    }
}
