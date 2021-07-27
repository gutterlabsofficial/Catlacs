const hre = require("hardhat")
require("@nomiclabs/hardhat-web3")
const fs = require("fs-extra")

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

async function main() {
	fs.removeSync("cache")
	fs.removeSync("artifacts")
	await hre.run("compile")

	// We get the contract to deploy
	const NFTContract = await hre.ethers.getContractFactory("Catlacs")
	console.log("Deploying The NFT Contract...")

	let network = process.env.NETWORK ? process.env.NETWORK : "rinkeby"

	console.log(">-> Network is set to " + network)

	// ethers is avaialble in the global scope
	const [deployer] = await ethers.getSigners()
	const deployerAddress = await deployer.getAddress()
	const account = await web3.utils.toChecksumAddress(deployerAddress)
	const balance = await web3.eth.getBalance(account)

	console.log(
		"Deployer Account " + deployerAddress + " has balance: " + web3.utils.fromWei(balance, "ether"),
		"ETH"
	)

	let catContractAddress = "0xEdB61f74B0d09B2558F1eeb79B247c1F363Ae452" //mainnet
	if (network === "rinkeby") {
		catContractAddress = "0xE854B7D7d0fb1C4d5775795773Dc8F7fC85C2Aa2" //rinkeby
	}

	const deployed = await NFTContract.deploy(catContractAddress)

	let dep = await deployed.deployed()

	console.log("Contract deployed to:", dep.address)

	await sleep(35000)

	await hre.run("verify:verify", {
		address: dep.address,
		constructorArguments: [catContractAddress],
	})
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
