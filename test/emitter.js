const assert = require("assert");
const {it} = require("mocha");
const Emitter = artifacts.require("Emitter");

contract("Emitter", accounts => {

    describe("emitInt", function () {
        it("should emit int", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitInt(-123);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(new web3.utils.BN(tx.logs[0].args.value).toNumber(), -123);
        });

        it("should emit int array", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitIntArray([-123, 0, "1", -1e5]);

            assert.ok(tx.logs.length = 1);
            assert.deepStrictEqual(tx.logs[0].args.value.map(int => new web3.utils.BN(int).toString()), ["-123", "0", "1", "-100000"]);
        });
    });

    describe("emitUint", function () {
        it("should emit uint", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitUint(123);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(new web3.utils.BN(tx.logs[0].args.value).toNumber(), 123);
        });

        it("should emit fixed uint array", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitUintArrayFixed([0, "1", 1e5]);

            assert.ok(tx.logs.length = 1);
            assert.deepStrictEqual(tx.logs[0].args.value.map(uint => new web3.utils.BN(uint).toString()), ["0", "1", "100000"]);
        });

    });

    describe("emitBool", function () {
        it("should emit bool", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitBool(false);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(tx.logs[0].args.value, false);
        });

        it("should emit bool fixed array", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitBoolArrayFixed([true, false]);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(tx.logs[0].args.value[0], true);
            assert.strictEqual(tx.logs[0].args.value[1], false);
        });
    });

    describe("emitAddress", function () {
        it("should emit address", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitAddress(instance.address);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(web3.utils.toChecksumAddress(tx.logs[0].args.value), web3.utils.toChecksumAddress(instance.address));
        });

        it("should emit address array", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitAddressArray([instance.address]);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(web3.utils.toChecksumAddress(tx.logs[0].args.value[0]), web3.utils.toChecksumAddress(instance.address));
        });
    });

    describe("emitString", function () {
        it("should emit string", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitString("123");

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(tx.logs[0].args.value, "123");
        });

        it("should emit string array", async () => {
            const instance = await Emitter.deployed();
            const tx = await instance.emitStringArray(["Hello", "🖐"]);

            assert.ok(tx.logs.length = 1);
            assert.strictEqual(tx.logs[0].args.value[0], "Hello");
            assert.strictEqual(tx.logs[0].args.value[1], "🖐");
        });
    });
});