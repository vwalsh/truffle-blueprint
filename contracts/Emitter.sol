// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.7.0;

contract Emitter {
    event _emitInt(int value);
    event _emitUint(uint value);
    event _emitBool(bool value);
    event _emitAddress(address value);
    event _emitString(string value);
    event _emitAddressArrayDynamic(address[] value);
    event _emitBoolArrayFixed(bool[2] value);

    function getCaller() public view returns (address) {
        return (msg.sender);
    }

    function emitInt() public {
        emit _emitInt(int(- 123));
    }

    function emitUint() public {
        emit _emitUint(uint(123));
    }

    function emitBool() public {
        emit _emitBool(bool(false));
    }

    function emitAddress() public {
        emit _emitAddress(address(msg.sender));
    }

    function emitString() public {
        emit _emitString(string("123"));
    }

    function emitAddressArrayDynamic() public {
        address[] memory value = new address[](2);
        value[0] = address(this);
        value[1] = address(msg.sender);

        emit _emitAddressArrayDynamic(value);
    }

    function emitBoolArrayFixed() public {
        bool[2] memory value = [bool(true), bool(false)];

        emit _emitBoolArrayFixed(value);
    }
}