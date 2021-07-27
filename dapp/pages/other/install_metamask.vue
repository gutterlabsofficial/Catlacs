<template>
  <v-layout align-center justify-center class="metamask-info-template">
    <v-flex xs12 sm8 md6 class="metamask-info-template__row">
      <v-card elevation="0" class="metamask-info-template__card">
        <v-card-title class="error white--text quick-font-fix-for-mobile"
          >Metamask is needed to run this application</v-card-title
        >
        <v-card-text>
          <br /><br />
          MetaMask is a web extension, which allows you to manage your Ethereum
          private keys via your web browser. <br />
          <br />
          By doing so, it serves as a wallet for Ether and ERC20 tokens, and
          allows you to visit the distributed web of tomorrow in your browser
          today. <br />
          <br />To be more specific, it allows you to run Ethereum dApps
          (Decentralized Apps) right in your browser without running a full
          Ethereum node. ( It means you don’t have to download and sync the full
          blockchain on your device/computer). <br />
          <br />
          Metamask's mission is to make Ethereum as easy to use for as many
          people as possible.
        </v-card-text>
        <v-card-title>How do I install Metamask?</v-card-title>
        <v-card-text>
          <br />Visit
          <a target="_blank" href="https://metamask.io/"
            >https://metamask.io/</a
          >
          <br />
          <br />Click “Get Chrome / Firefox Extension”. You will be directed to
          Chrome Web Store. <br /><br />Click “Add to Chrome / Firefox” On the
          pop up, click “Add extension” <br /><br />Follow the instructions on
          the screen <br /><br />For more information visit
          <a
            target="_blank"
            href="https://metamask.zendesk.com/hc/en-us/sections/360002198491-Getting-started"
            >Metamask Getting Started</a
          >
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: false,
  data: () => ({
    variable: null,
  }),
  mounted() {},
}
</script>

<style>
.v-card__title.quick-font-fix-for-mobile {
  font-size: 13px;
}
</style>
