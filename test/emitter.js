const Emitter = artifacts.require("Emitter");

contract("Emitter", accounts => {

    it("getCaller", async () => {
        const instance = await Emitter.deployed();
        const randomAddress = web3.utils.toChecksumAddress(web3.utils.randomHex(20));
        const callerAddress = await instance.getCaller.call({
            from: randomAddress
        });

        assert.strictEqual(web3.utils.toChecksumAddress(callerAddress), randomAddress);
    });

    it("emitInt", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitInt();

        assert.ok(tx.logs.length = 1);
        assert.ok(web3.utils.isBN(tx.logs[0].args.value));
        assert.strictEqual(web3.utils.BN(tx.logs[0].args.value).toNumber(), -123);
    });

    it("emitUint", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitUint();

        assert.ok(tx.logs.length = 1);
        assert.ok(web3.utils.isBN(tx.logs[0].args.value));
        assert.strictEqual(web3.utils.BN(tx.logs[0].args.value).toNumber(), 123);
    });

    it("emitBool", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitBool();

        assert.ok(tx.logs.length = 1);
        assert.strictEqual(tx.logs[0].args.value, false);
    });

    it("emitAddress", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitAddress();

        assert.ok(tx.logs.length = 1);
        assert.strictEqual(web3.utils.toChecksumAddress(tx.logs[0].args.value), web3.utils.toChecksumAddress(tx.receipt.from));
    });

    it("emitString", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitString();

        assert.ok(tx.logs.length = 1);
        assert.strictEqual(tx.logs[0].args.value, "123");
    });

    it("emitAddressArrayDynamic", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitAddressArrayDynamic();

        assert.ok(tx.logs.length = 1);
        assert.strictEqual(tx.logs[0].args.value.length, 2);
        assert.strictEqual(web3.utils.toChecksumAddress(tx.logs[0].args.value[0]), web3.utils.toChecksumAddress(tx.receipt.to));
        assert.strictEqual(web3.utils.toChecksumAddress(tx.logs[0].args.value[1]), web3.utils.toChecksumAddress(tx.receipt.from));
    });

    it("emitBoolArrayFixed", async () => {
        const instance = await Emitter.deployed();
        const tx = await instance.emitBoolArrayFixed();

        assert.ok(tx.logs.length = 1);
        assert.strictEqual(tx.logs[0].args.value.length, 2);
        assert.strictEqual(tx.logs[0].args.value[0], true);
        assert.strictEqual(tx.logs[0].args.value[1], false);
    });
});