export default {
  getGrowerById: state => (id) => {
    return state.list.find(grower => grower.id === id)
  }
}
