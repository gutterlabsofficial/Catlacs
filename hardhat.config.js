require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-web3")
require("@nomiclabs/hardhat-etherscan")

module.exports = {
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		hardhat: {
			chainId: 127001,
			accounts: {
				mnemonic: "test test test test test test test test test test test junk",
			},
			blockGasLimit: 199022552,
			gas: 1500000,
			gasPrice: 100,
			allowUnlimitedContractSize: false,
			throwOnTransactionFailures: false,
			throwOnCallFailures: true,
		},
		ganache: {
			url: "http://127.0.0.1:7545",
			blockGasLimit: 10000000,
		},
		mainnet: {
			url: process.env.MAINNET_RPC,
			gas: 1500000,
			gasPrice: 66000000000, //66 gwei
			timeout: 99000,
			accounts: [process.env.PRIVATE_KEY_MAINNET],
		},
		rinkeby: {
			url: process.env.RINKEBY_RPC,
			network_id: 4,
			gas: 1500000,
			gasPrice: 66000000000, //87 gwei
			timeout: 15000,
			accounts: [process.env.PRIVATE_KEY_RINKEBY],
		},
		matic: {
			url: process.env.MATIC_RPC,
			network_id: 137,
			gas: 10000000,
			gasPrice: 1000000000, //1 gwei
			allowUnlimitedContractSize: true,
			accounts: [process.env.PRIVATE_KEY_MATIC],
		},
		matic_test: {
			url: process.env.MATIC_RPC_TEST,
			network_id: 80001,
			gas: 10000000,
			gasPrice: 1000000000, //1 gwei
			allowUnlimitedContractSize: true,
			accounts: [process.env.PRIVATE_KEY_MATIC],
		},
	},

	gasReporter: {
		enabled: !!process.env.REPORT_GAS === true,
		currency: "USD",
		gasPrice: 20,
		showTimeSpent: true,
		coinmarketcap: process.env.COINMARKETCAP_API,
	},
	mocha: {
		timeout: 25000,
	},
	etherscan: {
		apiKey: process.env.MATIC_API,
	},
}
