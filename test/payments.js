const assert = require("assert");
const {describe, it} = require("mocha");
const Payments = artifacts.require("Payments");

contract("Payments", accounts => {

    describe("pay", function () {
        it("should pay", async () => {
            const instance = await Payments.deployed();
            const oldBalance = new web3.utils.BN(await web3.eth.getBalance(accounts[1]));
            const amount = new web3.utils.BN(web3.utils.toWei("1", 'ether'));

            const tx = await instance.pay(accounts[1], {
                value: amount.toString(),
                from: accounts[0],
                gas: 0,
            });

            const newBalance = new web3.utils.BN(await web3.eth.getBalance(accounts[1]));

            assert.ok(tx.logs.length = 1);
            assert.ok(newBalance.gt(oldBalance));
            assert.ok(newBalance.sub(oldBalance).eq(amount));
        });
    });
});