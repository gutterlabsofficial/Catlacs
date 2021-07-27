<template>
  <v-app dark style="background-color: #9e9ca6">
    <v-app-bar
      class="app-nav"
      color="transparent"
      clipped-left
      app
      elevation="0"
    >
      <v-toolbar-title>
        <nuxt-link style="text-decoration: none" to="/">
          <img
            src="/logo.png"
            class="logo-img"
            style="height: 150px"
            alt="guttercatgang logo"
          />
        </nuxt-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn
        href="https://discord.com/invite/guttercatgang"
        target="_blank"
        fab
        text
        redtext
      >
        <v-icon>mdi-discord</v-icon>
      </v-btn>

      <v-btn
        href="https://twitter.com/guttercatgang"
        target="_blank"
        fab
        text
        redtext
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>

      <v-btn color="red" class="ma-2" @click="metamaskButtonClicked()">{{
        walletBtnText
      }}</v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text
          v-if="showNonMainnetWarning"
          class="red white--text text-center"
        >
          <strong>Warning!</strong> Not connected to Ethereum Mainnet
        </v-card-text>

        <v-card-text class="py-2 white--text text-center">
          VERIFIED SMART CONTRACT ADDRESS:
          <a
            target="_blank"
            style="text-decoration: underline"
            :href="`https://etherscan.io/address/${contractAddress}`"
            >{{ contractAddress }}</a
          >
        </v-card-text>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>GutterCatGang.com</strong> |
          <a
            target="_blank"
            style="text-decoration: underline"
            href="/other/disclaimer"
            >Disclaimer</a
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { ethers } from 'ethers'
import { RPC_PROVIDER, NETWORK_ID, CONTRACT_ADDR } from '../constants'
export default {
  auth: false,
  data() {
    return {
      contractAddress: CONTRACT_ADDR,
      walletBtnText: 'CONNECT WALLET',
      ethers: null,
      provider: null,
      showNonMainnetWarning: false,
    }
  },
  mounted() {
    this.rpcProviderInit()
  },
  methods: {
    async rpcProviderInit() {
      if (!window.ethereum) {
        this.provider = 'not_web3'
        this.ethers = new ethers.providers.JsonRpcProvider(
          RPC_PROVIDER,
          NETWORK_ID
        )
        return
      }

      this.provider = 'web3'
      this.ethers = new ethers.providers.Web3Provider(window.ethereum, 'any')
      this.ethers.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload()
        }
      })

      this.signer = this.ethers.getSigner()
      this.account = await this.signer.getAddress()
      this.balance = await this.signer.getBalance()
      this.ethBalance = await ethers.utils.formatEther(this.balance)
      this.signer = this.ethers.getSigner()
      const addr = await this.signer.getAddress()
      this.walletBtnText =
        addr.substr(0, 7) + '...' + addr.substr(addr.length - 5, addr.length)

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length < 1) return

        this.walletBtnText =
          accounts[0].substr(0, 7) +
          '...' +
          accounts[0].substr(accounts[0].length - 5, accounts[0].length)
      })

      const { chainId } = await this.ethers.getNetwork()
      if (chainId !== 1) {
        this.showNonMainnetWarning = true
      }
    },
    goToUrl(url) {
      this.$router.push(url)
    },
    goToExternalUrl(url) {
      window.open(url, '_blank')
    },
    metamaskButtonClicked() {
      if (window.ethereum) {
        this.rpcProviderInit()
      } else {
        this.$router.push('/other/install_metamask')
      }
    },
  },
}
</script>
<style scoped>
#styled-input {
  height: 48px;
  width: 48px;
}
.styled-input label[for] {
  height: 48px;
}
.v-navigation-drawer > .list:not(.list--dense) .list__tile {
  font-size: 17px;
}
.avatar {
  max-width: 75px;
}
/* .list__tile--active.list__tile.list__tile--link {
} */
a.nuxt-link-exact-active.list__tile--active.list__tile.list__tile--link {
  font-weight: 900 !important;
}
.v-list-item {
  border-left: 10px solid transparent;
}
.v-list-item--active {
  color: #333;
  border-left: 10px solid #ff5722;
}
</style>
