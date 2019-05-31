import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    properties: [],
    searchFieldText: null,
    isSearchFieldEnabled: false
  },

  mutations: {
    SET_PROPERTIES(state, properties) {
      state.properties = properties
    },

    ENABLE_SEARCH_FIELD(state, payload) {
      state.isSearchFieldEnabled = payload
    },

    SET_SEARCH_FIELD_TEXT(state, payload) {
      state.searchFieldText = payload
    }
  },

  actions: {
    setProperties({ commit }, properties) {
      commit('SET_PROPERTIES', properties)
    },

    enableSearchField({ commit }, payload) {
      commit('ENABLE_SEARCH_FIELD', payload)
    },

    setSearchFieldText({ commit }, payload) {
      commit('SET_SEARCH_FIELD_TEXT', payload)
    }
  }
})
