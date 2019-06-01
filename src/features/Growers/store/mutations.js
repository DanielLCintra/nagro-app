export default {
  SET_GROWERS(state, growers) {
    state.list = growers
  },

  REMOVE_GROWER(state, index) {
    state.list.splice(index, 1)
  },

  ADD_GROWER(state, grower) {
    grower.id = state.list.length + 1
    state.list.unshift(grower)
  },

  UPDATE_GROWER(state, { index, grower }) {
    state.list.splice(index, 1)
    state.list.unshift(grower)
  }
}
