// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/math/SignedSafeMath.sol';

contract Caller {
    using SafeMath for uint256;
    using SignedSafeMath for int256;
    address payable public owner;

    constructor() public {
        owner = msg.sender;
    }

    function getCaller() public view returns (address) {
        return (msg.sender);
    }

    function callWithNoReturn() public view {
        // do nothing
    }

    function callReturnUint() public pure returns (uint256, uint256[] memory) {
        uint256[] memory _uint = new uint256[](2);
        _uint[0] = 0;
        _uint[1] = 1000000000000000000;

        return (123, _uint);
    }

    function callReturnBool() public pure returns (bool, bool, bool[] memory, bool[2][3] memory) {
        bool[] memory _bool = new bool[](3);
        _bool[0] = true;
        _bool[1] = true;
        _bool[2] = false;

        return (true, false, _bool, [[true, true], [true, false], [false, false]]);
    }

    function callNegateBoolArray(bool[] memory value) public pure returns (bool[] memory) {
        for (uint i = 0; i < value.length; i++) {
            value[i] = !value[i];
        }
        return value;
    }

    function callSumUintArray(uint256[] memory value) public pure returns (uint256, uint256[] memory) {
        uint256 sum = 0;
        for (uint256 i = 0; i < value.length; i++) {
            sum = sum.add(value[i]);
        }
        return (sum, value);
    }

    function callDecreaseInt(int256[] memory value) public pure returns (int256[] memory) {
        for (uint256 i = 0; i < value.length; i++) {
            value[i] = value[i].sub(1);
        }
        return value;
    }

    function callFlattenAddressArray(address[][2] memory value) public pure returns (address[] memory) {
        address[] memory _address = new address[](value[0].length + value[1].length);
        uint256 idx0 = 0;

        for (idx0; idx0 < value[0].length; idx0++) {
            _address[idx0] = value[0][idx0];
        }
        for (uint256 idx1 = 0; idx1 < value[1].length; idx1++) {
            _address[idx0 + idx1] = value[1][idx1];
        }

        return _address;
    }

    function callReturnMixed() public view returns (int256, uint256, bool, string memory, address, address payable) {
        return (- 1, 0, false, "false", address(this), owner);
    }

    function callReturnMixed(int256 _int, uint256 _uint, bool _bool, string calldata _string, address _address) public pure returns (int256, uint256, bool, string calldata, address) {
        return (_int, _uint, _bool, _string, _address);
    }
}