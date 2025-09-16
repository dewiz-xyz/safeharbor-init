export const FACTORY_ABI = [{"inputs":[{"components":[{"internalType":"string","name":"protocolName","type":"string"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"contact","type":"string"}],"internalType":"struct Contact[]","name":"contactDetails","type":"tuple[]"},{"components":[{"internalType":"string","name":"assetRecoveryAddress","type":"string"},{"components":[{"internalType":"string","name":"accountAddress","type":"string"},{"internalType":"enum ChildContractScope","name":"childContractScope","type":"uint8"}],"internalType":"struct Account[]","name":"accounts","type":"tuple[]"},{"internalType":"string","name":"caip2ChainId","type":"string"}],"internalType":"struct Chain[]","name":"chains","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"bountyPercentage","type":"uint256"},{"internalType":"uint256","name":"bountyCapUSD","type":"uint256"},{"internalType":"bool","name":"retainable","type":"bool"},{"internalType":"enum IdentityRequirements","name":"identity","type":"uint8"},{"internalType":"string","name":"diligenceRequirements","type":"string"},{"internalType":"uint256","name":"aggregateBountyCapUSD","type":"uint256"}],"internalType":"struct BountyTerms","name":"bountyTerms","type":"tuple"},{"internalType":"string","name":"agreementURI","type":"string"}],"internalType":"struct AgreementDetailsV2","name":"details","type":"tuple"},{"internalType":"address","name":"registry","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"create","outputs":[{"internalType":"address","name":"agreementAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"}]

export const AGREEMENTV2_ABI = [
    {
        type: "function",
        name: "addChains",
        inputs: [
            {
                name: "_chains",
                type: "tuple[]",
                internalType: "struct Chain[]",
                components: [
                    {
                        name: "assetRecoveryAddress",
                        type: "string",
                        internalType: "string",
                    },
                    {
                        name: "accounts",
                        type: "tuple[]",
                        internalType: "struct Account[]",
                        components: [
                            {
                                name: "accountAddress",
                                type: "string",
                                internalType: "string",
                            },
                            {
                                name: "childContractScope",
                                type: "uint8",
                                internalType: "enum ChildContractScope",
                            },
                        ],
                    },
                    {
                        name: "caip2ChainId",
                        type: "string",
                        internalType: "string",
                    },
                ],
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    }
];
