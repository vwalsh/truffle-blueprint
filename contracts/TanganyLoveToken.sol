// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';

contract TanganyLoveToken is ERC20PresetMinterPauser {
    using SafeMath for uint256;

    constructor() ERC20PresetMinterPauser("TanganyLoveToken", "TLT") public {}

    function mint(address to, uint256 amount) public virtual override {
        _mint(to, amount.mul(1e18));
    }
}