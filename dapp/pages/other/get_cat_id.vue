<template>
  <v-layout align-center justify-center class="metamask-info-template">
    <v-flex xs12 sm8 md6 class="metamask-info-template__row">
      <v-card elevation="0" class="metamask-info-template__card">
        <v-card-title class="secondary black--text quick-font-fix-for-mobile"
          >How to get your cat ID</v-card-title
        >
        <v-card-text>
          <br /><br />
          Your cat ID is the NFT id & also part of the Cat Name. <br />
          <br />
          <img style="max-width: 800px" src="https://i.imgur.com/sJby1SK.png" />
          <br />
          If you don't know what cats you own go to
          <a
            style="text-decoration: underline"
            target="_blank"
            href="https://opensea.io/account"
            >https://opensea.io/account</a
          >
          and check any pictures of gutter cats you see there
        </v-card-text>
        <v-card-title>Double check that the ID is correct</v-card-title>
        <v-card-text>
          <br />You can always visit the official contract on etherscan

          <a
            style="text-decoration: underline"
            target="_blank"
            href="https://etherscan.io/address/0xedb61f74b0d09b2558f1eeb79b247c1f363ae452#readContract"
            >https://etherscan.io/address/0xedb61f74b0d09b2558f1eeb79b247c1f363ae452#readContract</a
          >
          <br /><br />

          <img
            style="max-width: 800px"
            src=" https://i.imgur.com/qMOJMH9.png"
          />

          <br />
          <br />Under the Contract section -> Read Contract -> balanceOf
          function, check with your wallet if the query returns 1. If it return
          1, the cat belongs to that address. If it returns 0, it does not
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
  font-size: 1.5em;
}
</style>
