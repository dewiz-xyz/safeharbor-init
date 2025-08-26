export const FACTORY_ABI = [
    {
        "type": "function",
        "name": "create",
        "inputs": [
            {
                "name": "details",
                "type": "tuple",
                "internalType": "struct AgreementDetailsV2",
                "components": [
                    {
                        "name": "protocolName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "contactDetails",
                        "type": "tuple[]",
                        "internalType": "struct Contact[]",
                        "components": [
                            {
                                "name": "name",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "contact",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "chains",
                        "type": "tuple[]",
                        "internalType": "struct Chain[]",
                        "components": [
                            {
                                "name": "assetRecoveryAddress",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "accounts",
                                "type": "tuple[]",
                                "internalType": "struct Account[]",
                                "components": [
                                    {
                                        "name": "accountAddress",
                                        "type": "string",
                                        "internalType": "string"
                                    },
                                    {
                                        "name": "childContractScope",
                                        "type": "uint8",
                                        "internalType": "enum ChildContractScope"
                                    }
                                ]
                            },
                            {
                                "name": "caip2ChainId",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "bountyTerms",
                        "type": "tuple",
                        "internalType": "struct BountyTerms",
                        "components": [
                            {
                                "name": "bountyPercentage",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "bountyCapUSD",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "retainable",
                                "type": "bool",
                                "internalType": "bool"
                            },
                            {
                                "name": "identity",
                                "type": "uint8",
                                "internalType": "enum IdentityRequirements"
                            },
                            {
                                "name": "diligenceRequirements",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "aggregateBountyCapUSD",
                                "type": "uint256",
                                "internalType": "uint256"
                            }
                        ]
                    },
                    {
                        "name": "agreementURI",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            },
            {
                "name": "registry",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "agreementAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    }
];

export const AGREEMENTV2_RAW_ABI_MAP = {
    addChains: "addChains(tuple(string, tuple(string, uint8)[], uint256)[])",
    setChains:
        "setChains(uint256[], tuple(string, tuple(string, uint8)[], uint256)[])",
    removeChain: "removeChain(uint256)",
    addAccounts: "addAccounts(uint256, tuple(string, uint8)[])",
    setAccounts: "setAccounts(uint256, uint256[], tuple(string, uint8)[])",
    removeAccount: "removeAccount(uint256, uint256)",
};

export const AGREEMENTV2_ABI = [
    "function getDetails() view returns (tuple(string protocolName, tuple(string name, string contact)[] contactDetails, tuple(string assetRecoveryAddress, tuple(string accountAddress, uint8 childContractScope)[] accounts, uint256 id)[] chains, tuple(uint256 bountyPercentage, uint256 bountyCapUSD, bool retainable, uint8 identity, string diligenceRequirements) bountyTerms, string agreementURI))",
    "function addChains(tuple(string assetRecoveryAddress, tuple(string accountAddress, uint8 childContractScope)[] accounts, uint256 id)[] chains)",
    "function setChains(uint256[] chainIds, tuple(string assetRecoveryAddress, tuple(string accountAddress, uint8 childContractScope)[] accounts, uint256 id)[] chains)",
    "function removeChain(uint256 chainId)",
    "function addAccounts(uint256 chainId, tuple(string accountAddress, uint8 childContractScope)[] accounts)",
    "function setAccounts(uint256 chainId, uint256[] accountIds, tuple(string accountAddress, uint8 childContractScope)[] accounts)",
    "function removeAccount(uint256 chainId, uint256 accountId)",
];
