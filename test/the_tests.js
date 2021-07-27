const { expect, assert } = require("chai")
const { web3, ethers } = require("hardhat")
const { BN, time, balance, expectEvent, expectRevert } = require("@openzeppelin/test-helpers")
const ether = require("@openzeppelin/test-helpers/src/ether")

let nft
let owner, acc1, acc2

describe("NFT", function () {
	beforeEach(async function () {
		let TContract = await ethers.getContractFactory("Catlacs")

		nft = await TContract.deploy()
		await nft.deployed()

		signers = await ethers.getSigners()
		owner = signers[0]
		acc1 = signers[1]
		acc2 = signers[2]
	})

	it("simple test...", async function () {
		expect(await nft.totalSupply()).to.equal(0)
	})

	it("purchasing a token works", async function () {
		await nft.startSale()
		await expect(
			nft.connect(acc1).purchaseToken(1, { value: web3.utils.toWei("0.1", "ether") })
		).to.emit(nft, "Transfer")
	})

	it("purchasing 3 tokens works", async function () {
		await nft.startSale()
		await expect(
			nft.connect(acc1).purchaseToken(3, { value: web3.utils.toWei("0.3", "ether") })
		).to.emit(nft, "Transfer")
	})

	it("burning a token works", async function () {
		await nft.startSale()
		await expect(
			nft.connect(acc1).purchaseToken(1, { value: web3.utils.toWei("0.1", "ether") })
		).to.emit(nft, "Transfer")

		expect(await nft.balanceOf(acc1.address)).to.equal(1)

		await nft.connect(acc1).burn(1)
		expect(await nft.balanceOf(acc1.address)).to.equal(0)
	})

	it("can't burn other tokens than your own", async function () {
		await nft.startSale()
		await expect(
			nft.connect(acc1).purchaseToken(1, { value: web3.utils.toWei("0.1", "ether") })
		).to.emit(nft, "Transfer")
		await expect(
			nft.connect(acc2).purchaseToken(1, { value: web3.utils.toWei("0.1", "ether") })
		).to.emit(nft, "Transfer")

		expect(await nft.balanceOf(acc1.address)).to.equal(1)

		await expect(nft.connect(acc1).burn(2)).to.be.revertedWith(
			"revert caller is not owner nor approved"
		)
	})
})
