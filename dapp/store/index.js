export const state = () => ({
  selectedAddress: null,
  networkID: 0
})

export const mutations = {
  setSelectedAddress(state, payload) {
    state.selectedAddress = payload
  },
  setNetworkID(state, payload) {
    state.networkID = payload
  }
}
