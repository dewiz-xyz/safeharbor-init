pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console2.sol";

interface IAgreementLike {
    function transferOwnership(address newOwner) external;
}

// NOTE: File required for bootstrapping the initial deployment of the AgreementV2 contract, remove after adoption.
contract InitAgreement is Script {
    address constant PAUSE_PROXY = 0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB;

    // Add all initial chain payloads in env var as comma-separated hex-encoded bytes.
    // Use the output from `npm run generate:initial` to populate INITIAL_CALLDATAS.
    function run() external {
        address agreement = vm.envAddress("AGREEMENT");
        console.log("Initializing agreement: ", agreement);

        bytes[] memory initialPayloads = vm.envBytes("INITIAL_CALLDATAS", ",");
        console.log("Got ", initialPayloads.length, " initial payloads");
        require(initialPayloads.length > 0, "Missing env INITIAL_CALLDATAS");

        vm.startBroadcast();

        for (uint256 i = 0; i < initialPayloads.length; i++) {
            (bool success, bytes memory result) = agreement.call(initialPayloads[i]);
            if (!success) {
                revert(string(result));
            }
        }

        // Transfer the ownership to DSPauseProxy
        IAgreementLike(agreement).transferOwnership(PAUSE_PROXY);

        vm.stopBroadcast();
    }
}
