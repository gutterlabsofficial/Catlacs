<template>
  <v-container>
    <v-form class="search-form" lazy-validation>
      <div class="search-form__row text-xs-center justify-center">
        <div v-if="!txHash" style="text-align: center">
          <p class="mt-5">
            <img
              src="https://github.com/nftinvesting/Catlacs/blob/master/other/purple.gif?raw=true"
              style="max-width: 250px; text-align: center"
              alt="catlac purple default image"
            />
            <br />
            <img
              src="https://github.com/nftinvesting/Catlacs/blob/master/other/red.gif?raw=true"
              style="max-width: 250px; text-align: center"
              alt="gutter rat default image"
            />
          </p>

          <v-text-field
            v-model="catID"
            style="text-align: center; color: white !important"
            label="My Cat ID"
            required
          ></v-text-field>
          <v-btn
            x-large
            style="max-width: 190px"
            color="blue darken-1"
            @click="dialogConfirmation = true"
          >
            CLAIM YOUR CAR
          </v-btn>

          <p class="mt-5">
            <a
              style="text-decoration: underline"
              target="_blank"
              href="/other/get_cat_id"
              >how to get my cat id?</a
            >
          </p>

          <v-btn color="grey darken-4" @click="dialogVerifyClaimedRat = true"
            >car mint checker</v-btn
          >
        </div>

        <v-card v-if="txHash" class="pa-5 ma-5" color="#6EC1E4">
          <p style="text-align: center">
            You can check your transaction status
            <span style="font-weight: bold"
              ><a target="_blank" :href="`https://etherscan.io/tx/${txHash}`"
                >here</a
              ></span
            >
          </p>
          <br />
          <p style="text-align: center">
            In a few minutes, your Car will show up in Opensea
            <span style="font-weight: bold">
              <a
                target="_blank"
                href="https://opensea.io/collection/guttercatlacs"
                >opensea.io/collections/guttercatlacs</a
              ></span
            >
          </p>
          <br />
          <p class="mt-5" style="text-align: center">Keep it Gutta!</p>
        </v-card>
      </div>
    </v-form>

    <v-dialog v-model="dialogConfirmation" class="ma-5 pa-5" max-width="600px">
      <v-card color="grey darken-4">
        <v-card-title> Before you go any further... </v-card-title>
        <v-card-text
          >please
          <a
            style="text-decoration: underline"
            target="_blank"
            href="/other/get_cat_id"
            >confirm</a
          >
          that you own the Gutter Cat with the ID that you entered</v-card-text
        >
        <v-card-text
          >and read our
          <a
            style="text-decoration: underline"
            target="_blank"
            href="/other/disclaimer"
            >disclaimer</a
          >
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            @click="
              dialogConfirmation = false
              errorText = ''
              claimPet()
            "
          >
            CONFIRM
          </v-btn>

          <v-btn
            color="red darken-1"
            @click="
              dialogConfirmation = false
              errorText = ''
            "
          >
            CANCEL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogError" class="ma-5 pa-5" max-width="600px">
      <v-card color="red darken-4">
        <v-card-title>
          {{ errorText }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            @click="
              dialogError = false
              errorText = ''
            "
          >
            EXIT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogVerifyClaimedRat"
      class="ma-5 pa-5"
      max-width="300px"
    >
      <v-card class="pa-5" color="accent darken-4">
        <v-card-text>
          <v-text-field
            v-model="verifyCatID"
            style="max-width: 300px; color: white !important"
            label="Enter cat ID"
            required
          ></v-text-field>
          <v-btn
            x-large
            block
            style="max-width: 190px"
            color="accent darken-1"
            @click="
              dialogVerifyClaimedRat = false
              verifyCat()
            "
          >
            CONFIRM
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ethers } from 'ethers'
import {
  CONTRACT_ADDR,
  RPC_PROVIDER,
  NETWORK_ID,
  CONTRACT_ADDR_GUTTERCATS,
} from '../constants'
import { ERC1155_ABI } from '../erc1155_abi'
import { ERC721_ABI } from '../erc721_abi'

export default {
  auth: false,
  data() {
    return {
      dialogVerifyClaimedRat: false,
      id: null,
      verifyCatID: null,
      dialogConfirmation: false,
      catID: null,
      adoptedCats: null,
      tokenID: null,
      contract: null,
      contractAddress: null,
      itemPriceETH: null,
      itemPriceWei: null,
      txHash: null,
      isOwned: false,
      ethers: null,
      signer: null,
      provider: null,
      errorText: '',
      dialogAdoptMany: false,
      dialogError: false,
      howManyCats: 2,
      walletAddress: null,
      showRandNFTs: false,
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.contractAddress = CONTRACT_ADDR
    if (!window.ethereum) {
      this.provider = 'not_web3'
      this.ethers = new ethers.providers.JsonRpcProvider(
        RPC_PROVIDER,
        NETWORK_ID
      )
    } else {
      this.provider = 'web3'
      this.ethers = new ethers.providers.Web3Provider(window.ethereum)
    }
    this.initialize()
  },
  methods: {
    initialize() {
      this.isOwned = false
      this.loadContract()
    },

    async verifyCat() {
      if (this.verifyCatID === null) {
        this.$toast.error("what's the cat ID ?")
        return
      }
      try {
        const exists = await this.contract.exists(this.verifyCatID)

        if (exists) {
          this.errorText = 'The Car for this Gutter Cat ID was already claimed.'
          this.dialogError = true
        } else {
          this.$toast.info('This Car has not yet been claimed')
        }

        return
      } catch (err) {
        console.log(err)
        this.$toast.error(err.message)
      }
    },
    async claimPet() {
      if (!this.catID) {
        this.$toast.error('please pass your cat ID')
        return
      }
      if (isNaN(this.catID)) {
        this.$toast.error('You can only pass numbers')
        return
      }
      if (Number(this.catID) < 0) {
        this.$toast.error('invalid NFT ID')
        return
      }
      if (Number(this.catID) > 3000) {
        this.$toast.error('invalid NFT ID')
        return
      }

      this.txHash = null
      this.ethers = new ethers.providers.Web3Provider(window.ethereum)
      this.signer = this.ethers.getSigner()
      this.contract = new ethers.Contract(
        CONTRACT_ADDR,
        ERC721_ABI,
        this.signer
      )

      const res = await this.checkMetamaskConnected()
      if (!res) {
        return
      }
      const overrides = { value: this.itemPriceWei, gasLimit: 200000 }

      const contractGuttercatss = new ethers.Contract(
        CONTRACT_ADDR_GUTTERCATS,
        ERC1155_ABI,
        this.signer
      )
      //check if balance of this ID is > 0
      const balance = await contractGuttercatss.balanceOf(
        this.walletAddress,
        this.catID
      )
      if (Number(balance) === 0) {
        this.dialogError = true
        this.errorText =
          "we couldn't detect that you own this cat. if you belive this is an error, please call the 'mint' method directly from the blockchain explorer. As per our disclaimer we do not offer any refunds for failed transactions"
        return
      }

      try {
        const tx = await this.contract.mint(this.catID, overrides)
        if (tx.hash) {
          this.$toast.info('Transaction submitted successfully')
        }
        this.txHash = tx.hash
      } catch (err) {
        if (err.message.includes('denied')) {
          this.$toast.info('you canceled the transaction')
        } else {
          this.$toast.error(err.message)
        }
      }
    },
    loadContract() {
      this.contract = new ethers.Contract(
        CONTRACT_ADDR,
        ERC721_ABI,
        this.ethers
      )
    },
    async checkMetamaskConnected() {
      if (window.ethereum) {
        await window.ethereum.enable()
        this.ethers = new ethers.providers.Web3Provider(window.ethereum)

        this.signer = this.ethers.getSigner()
        this.account = await this.signer.getAddress()
        this.balance = await this.signer.getBalance()
        this.ethBalance = await ethers.utils.formatEther(this.balance)
        this.signer = this.ethers.getSigner()
        this.walletAddress = await this.signer.getAddress()
        this.walletBtnText =
          this.walletAddress.substr(0, 7) +
          '...' +
          this.walletAddress.substr(
            this.walletAddress.length - 5,
            this.walletAddress.length
          )

        const chainId = this.ethers._network.chainId
        this.$store.commit('setSelectedAddress', this.walletAddress)
        this.$store.commit('setNetworkID', Number(chainId))

        if (chainId !== 1) {
          this.showNonMainnetWarning = true
        }
        return true
      } else {
        this.$router.push('/other/install_metamask')
        return false
      }
    },
    viewOnOpenSea() {
      const url =
        'https://opensea.io/assets/' + this.contractAddress + '/' + this.id
      window.open(url, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
}
.black-text {
  color: black i !important;
}

.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: #ea201c;
}

.v-card {
  background-color: #333;
}
</style>
