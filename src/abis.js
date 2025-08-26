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
