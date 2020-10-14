// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/utils/Address.sol';

contract TestContract {
    address payable public owner;
    uint256 private value;

    event PaymentReceived(uint256 amount);
    event PaymentSentTo(uint256 amount, address receiver);
    event ValueChanged(uint256 newValue);
    event VaultUpdated(address storageid);

    constructor() public {
        owner = msg.sender;
    }

    function payme() public payable {
        Address.sendValue(owner, msg.value);
        emit PaymentReceived(msg.value);
    }

    function pay(address payable receiver) public payable {
        Address.sendValue(receiver, msg.value);
        emit PaymentSentTo(msg.value, receiver);
    }

    function alterWithoutArg() public {
        value = 1;
        emit ValueChanged(value);
    }

    function alterWithArg(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function callWithoutArgSingleReturn() public view returns (uint256) {
        return value;
    }

    function callWithArgMultiReturn(address returnValue) public view returns (address, uint256) {
        return (returnValue, value);
    }

    function getCaller() public view returns (address) {
        return (msg.sender);
    }

    // Storage functions
    struct Vault {
        uint updated;
        string value;
    }

    mapping(address => Vault) vaults;
    address[] public VaultAccounts;

    function setVault(address _address, string calldata _value) public {
        Vault storage v = vaults[_address];

        v.updated = now;
        v.value = _value;
        VaultAccounts.push(_address);

        emit VaultUpdated(_address);
    }

    function getVaults() view public returns (address[] memory) {
        return VaultAccounts;
    }

    function getVaultsWithTime() view public returns (address[] memory, uint) {
        return (VaultAccounts, now);
    }

    function getVault(address _address) view public returns (uint, string memory) {
        Vault storage v = vaults[_address];

        return (v.updated, v.value);
    }

    function getVaultValue(address _address) view public returns (string memory) {
        return (vaults[_address].value);
    }

    function getVaultUpdated(address _address) view public returns (uint) {
        return (vaults[_address].updated);
    }
}