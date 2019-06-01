export default {
  SET_GROWERS(state, growers) {
    state.list = growers
  },

  REMOVE_GROWER(state, index) {
    state.list.splice(index, 1)
  }
}
