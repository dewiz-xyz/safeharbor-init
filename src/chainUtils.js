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
