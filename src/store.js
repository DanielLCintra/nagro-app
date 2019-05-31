import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    properties: []
  },

  mutations: {
    SET_PROPERTIES(state, properties) {
      state.properties = properties
    }
  },

  actions: {
    setProperties({ commit }, properties) {
      commit('SET_PROPERTIES', properties)
    }
  }
})
