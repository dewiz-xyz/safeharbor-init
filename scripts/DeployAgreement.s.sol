// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface IAgreementLike {
    function transferOwnership(address newOwner) external;
}

// NOTE: File required for bootstrapping the initial deployment of the AgreementV2 contract, remove after adoption.
contract DeployAgreement is Script {
    address constant FACTORY = 	0xcf317fE605397bC3fae6DAD06331aE5154F277fF;
    address constant PAUSE_PROXY = 0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB;

    // Deploying an empty agreement
    // Generated using `npm run generate`
    bytes deployRawCalldata = vm.envBytes("DEPLOY_AGREEMENT_CALLDATA");
    function run() external {
        vm.startBroadcast();

        //Call create function with the calldata
        (bool success, bytes memory result) = FACTORY.call(deployRawCalldata);
        if (!success) {
            revert(string(result));
        }

        vm.stopBroadcast();

        (address agreement) = abi.decode(result, (address));
        console.log("Agreement deployed at: ", agreement);
    }
}
