import http from '../../../service/http'

export default {
  async getGrowers({ commit }) {
    const { data } = await http.get('/grower')
    if (data.length > 0) {
      commit('SET_GROWERS', data)
    }
  },

  addGrower() {},

  async removeGrower({ commit, state }, id) {
    const response = await http.delete(`/grower/${id}`)
    if (response) {
      const index = state.growers.findIndex(grower => grower.id === id)
      if (index !== -1) {
        commit('REMOVE_GROWER', index)
      }
    }
  },

  updateGrower() {},
}
