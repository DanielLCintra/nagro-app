import http from '../../../service/http'

export default {
  async getGrowers({ commit }) {
    const { data } = await http.get('/grower')
    if (data.length > 0) {
      commit('SET_GROWERS', data)
    }
  },

  async addGrower({ commit }, grower) {
    const response = await http.post('/grower', grower)
    if (response) {
      commit('ADD_GROWER', grower)
    }
  },

  async updateGrower({ commit, state }, grower) {
    const { data } = await http.put(`/grower/${grower.id}`, grower)
    if (data.length > 0) {
      const index = state.list.findIndex(listGrower => listGrower.id === grower.id)
      if (index !== -1) {
        commit('UPDATE_GROWER', { index, grower })
      }
    }
  },

  async removeGrower({ commit, state }, id) {
    const response = await http.delete(`/grower/${id}`)
    if (response) {
      const index = state.list.findIndex(grower => grower.id === id)
      if (index !== -1) {
        commit('REMOVE_GROWER', index)
      }
    }
  }
}
