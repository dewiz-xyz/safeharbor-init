# Initial Deployment Steps
Before adoption, a single-time deploy and configuration needs to happen so Sky protocol can safely include changes to the scope within spells. The deployment will happen with the following steps:

1. **EOA AgreementV2 deployment**

   - Anyone can deploy an instance of the `AgreementV2` contract through its factory
   - Since the initial configuration is too big to safely fit within a spell execution, the first step will be done through an EOA

2. **Initial chain configuration**

   - The EOA will use the reference sheet to create the initial state of the scope
   - This includes adding all necessary chains and contracts, as well as the asset recovery addresses

3. **Ownership transfer to DSPause**

   - After the initial setup is done, the EOA will fully transfer the ownership of the `AgreementV2` contract to the PauseProxy
   - This enables the PauseProxy to modify the scope in the future

4. **Adoption**
   - On a future spell, the pause proxy will call `safeharborRegistry.adoptSafeHarbor(agreementAddress)`
   - This officially accepts the terms and initiates the validity of SafeHarbor integration


# Generate Deployment Payload

To generate the deployment payload, run the following command:

```bash
npm run generate
```

This will output the calldata for deploying a new instance of the `AgreementV2` contract, with the pre-defined details, but without any chains. The output of this script is used as the first transaction on the DeployAgreement forge script.

# Generate Initial Payload

To generate the initial payload, run the following command:
```bash
npm run generate:initial
```
This script will generate the initial calldata for adding all the chains currently existing in the provided CSV sheet. The output of this script is used as the second transaction on the DeployAgreement forge script.


# Validating the Agreement

There are a few steps to independently validate that a given agreement can be adopted by Sky protocol.

1. It has to be deployed to a transaction to known public factory.
2. The owner of the agreement has to be PauseProxy.
3. The output of `generate` command, on spells-mainnet repo, has to be "no updates".

If all of these steps are done, the agreement can be adopted by Sky protocol.
