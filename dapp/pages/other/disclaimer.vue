<template>
  <v-layout align-center justify-center class="metamask-info-template">
    <v-flex xs12 sm8 md6 class="metamask-info-template__row">
      <v-card elevation="0" class="metamask-info-template__card">
        <v-card-title class="error white--text quick-font-fix-for-mobile"
          >Disclaimer</v-card-title
        >
        <v-card-text>
          <br />

          <br />
          You can check that the
          <a
            target="_blank"
            style="text-decoration: underline"
            href="https://github.com/nftinvesting/pets"
            >code
          </a>
          deployed on this contract is verified on etherscan, and you can review
          the source code here. This dapp is intended to be used by people
          familiar with NFTs and smart contracts. Please be sure you are
          familiar with the ethereum ecosystem and feel fully comfortable before
          utilizing our dapp. The Dapp is made available under the MIT open
          source license -- and the disclaimers contained therein apply
          including that the Gutter Cat Dapps is provided "AS IS" and "WITHOUT
          WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
          <br />
          <br />
          GutterCatGang's mission is to make Ethereum & NFTs as easy to use for
          as many people as possible.
        </v-card-text>

        <v-card-text>
          <br />GUTTERCATGANG AND GUTTER LABS LLC WILL NOT BE LIABLE FOR ANY
          LIABILITY OR DAMAGES WHATSOEVER ASSOCIATED WITH YOUR USE, INABILITY TO
          USE, OR YOUR INTERACTION WITH OTHER USERS OF, THIS DAPP, OTHER DAPPS
          PLATFORM, INCLUDING ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
          EXEMPLARY OR CONSEQUENTIAL DAMAGES, LOSS OF PROFITS, OR DATA.
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
  font-size: 2em;
}
</style>
