const assert = require("assert");
const web3 = require("web3");
const {describe, it} = require("mocha");
const Caller = artifacts.require("Caller");

contract("Caller", accounts => {

    describe("callWithNoReturn", function () {
        it("should not fail", async () => {
            const instance = await Caller.deployed();
            await assert.doesNotReject(() => instance.callWithNoReturn());
        });
    });

    describe("callReturnUint", function () {
        it("should return uint", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callReturnUint();

            assert.strictEqual(new web3.utils.BN(call[0]).toNumber(), 123);
            assert.deepStrictEqual(call[1].map(uint => new web3.utils.BN(uint).toString()), ["0", "1000000000000000000"]);
        });
    });

    describe("callReturnBool", function () {
        it("should return negated bool array", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callReturnBool();

            assert.strictEqual(call[0], true);
            assert.strictEqual(call[1], false);
            assert.deepStrictEqual(call[2], [true, true, false]);
            assert.deepStrictEqual(call[3], [[true, true], [true, false], [false, false]]);
        });
    });

    describe("callNegateBoolArray", function () {
        it("should return negated bool array", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callNegateBoolArray([true, false, true]);

            assert.deepStrictEqual(call, [false, true, false]);
        });
    });

    describe("callSumUintArray", function () {
        it("should return sum", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callSumUintArray([1, 2, 3]);

            // convert BNs to numbers for comparison
            assert.strictEqual(new web3.utils.BN(call[0]).toNumber(), 6);
            assert.deepStrictEqual(call[1].map(uint => new web3.utils.BN(uint).toNumber()), [1, 2, 3]);
        });

        it("should return sum for string numbers", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callSumUintArray(["1", "2", "3"]);

            assert.strictEqual(new web3.utils.BN(call[0]).toNumber(), 6);
            assert.deepStrictEqual(call[1].map(uint => new web3.utils.BN(uint).toNumber()), [1, 2, 3]);
        });

        it("should return sum for huge numbers", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callSumUintArray([
                "1000000000000000001",
                "2000000000000000002"
            ]);

            assert.strictEqual(new web3.utils.BN(call[0]).toString(), "3000000000000000003");
        });
    });

    describe("callDecreaseInt", function () {
        it("should return array", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callDecreaseInt([-1, 0, 1]);

            assert.deepStrictEqual(call.map(uint => new web3.utils.BN(uint).toNumber()), [-2, -1, 0]);
        });

        it("should return huge number", async () => {
            const instance = await Caller.deployed();
            const call = await instance.callDecreaseInt(["1000000000000000000"]);

            assert.deepStrictEqual(new web3.utils.BN(call[0]).toString(), "999999999999999999");
        });
    });

    describe("callFlattenAddressArray", function () {
        it("should return array", async () => {
            const instance = await Caller.deployed();
            const a = instance.address;
            const call = await instance.callFlattenAddressArray([[a, a], [a, a, a]]);

            assert.deepStrictEqual(call, [a, a, a, a, a]);
        });

        it("should return array with empty inputs", async () => {
            const instance = await Caller.deployed();
            const a = instance.address;
            const call = await instance.callFlattenAddressArray([[a, a], []]);

            assert.deepStrictEqual(call, [a, a]);
        });
    });
});