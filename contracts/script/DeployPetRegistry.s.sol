// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {PetRegistry} from "../src/PetRegistry.sol";

/// @notice Deploys PetRegistry only. No constructor args, no post-deploy calls.
contract DeployPetRegistry is Script {
    function run() external returns (PetRegistry registry) {
        vm.startBroadcast();
        registry = new PetRegistry();
        vm.stopBroadcast();
    }
}
