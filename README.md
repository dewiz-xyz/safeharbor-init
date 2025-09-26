# Initial Deployment Steps
Before adoption, a single-time deploy and configuration needs to happen so Sky protocol can safely include changes to the scope within spells. The deployment will happen with the following steps:

1. **EOA AgreementV2 deployment**

   - Anyone can deploy an instance of the `AgreementV2` contract through its factory
   - Since the initial configuration is too big to safely fit within a spell execution, the first step will be done through an EOA

2. **Initial chain configuration**

   - The EOA will use the reference sheet to create the initial state of the scope
   - This includes adding all necessary chains and contracts, as well as the asset recovery addresses

3. **Ownership transfer to Pause Proxy**

   - After the initial setup is done, the EOA will fully transfer the ownership of the `AgreementV2` contract to the PauseProxy
   - This enables the PauseProxy to modify the scope in the future

4. **Adoption**
   - On a future spell, the pause proxy will call `safeharborRegistry.adoptSafeHarbor(agreementAddress)`
   - This officially accepts the terms and initiates the validity of SafeHarbor integration

# Running the deployment script

To run the script with the current payloads, just run teh following command:

```bash
forge script scripts/DeployAgreement.s.sol:DeployAgreement --rpc-url $RPC_URL --private-key $PK -vvvvv --slow --broadcast
```
Note that the private key passed should be the same that maps to the address called `OWNER_ADDRESS` in the `generateDeploymentPayload.js` script.

## Re-generating payloads

### Generate Deployment Payload

To generate the deployment payload, run the following command:

```bash
npm run generate
```
This will output the calldata for deploying a new instance of the `AgreementV2` contract, with the pre-defined details, but without any chains. Take the output of this script and paste it in the `deployRawCalldata` variable in the `DeployAgreement.s.sol` script.

### Generate Initial Payload

To generate the initial payload, run the following command:
```bash
npm run generate:initial
```
This script will generate the initial calldata for adding all the chains currently existing in the provided CSV sheet. Take the output of this script and paste it in the `addAllChainsRawCalldata` variable in the `DeployAgreement.s.sol` script.

Once both steps are done, run the deployment script as mentioned above.

## Unichain note:
On mainnet state, the Unichain is not yet added as a valid chain in the Safeharbor Registry, therefore for a successful deployment, this transaction has to be done manually.

Details:
```json
{
  "from": "0x31d23affb90bcafcaae9f27903b151dcdc82569e", // Registry owner
  "to": "0x1eacd100b0546e433fbf4d773109cad482c34686", // Safeharbor Registry V2
  "Params": { "_caip2ChainIds": ["eip155:130"] }
  "RawData": "0xf2739053000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a6569703135353a31333000000000000000000000000000000000000000000000"
}
```

# Validating the Agreement

There are a few steps to independently validate that a given agreement can be adopted by Sky protocol.

1. It has to be deployed to a transaction to known public factory.
2. The owner of the agreement has to be PauseProxy.
3. The output of `generate` command, on spells-mainnet repo, has to be "no updates".

If all of these steps are done, the agreement can be adopted by Sky protocol.
