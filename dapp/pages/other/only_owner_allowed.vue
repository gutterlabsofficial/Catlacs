<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 ma-5 style="max-width: 600px">
      <v-card elevation="0" class="pa-5">
        <v-card-title class="error white--text"
          >Make sure you connect with Metamask using the owner
          account</v-card-title
        >
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
