export default {
  getGrowerPropertiesById: state => (id) => {
    return state.list.filter(property => property.growerId === id)
  }
}
