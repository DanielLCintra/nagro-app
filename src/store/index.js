import Vue from 'vue'
import Vuex from 'vuex'
import growers from '../features/Growers/store'
import properties from '../features/Properties/store'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    growers,
    properties
  },

  state: {
    searchFieldText: null,
    isSearchFieldEnabled: false
  },

  mutations: {
    ENABLE_SEARCH_FIELD(state, payload) {
      state.isSearchFieldEnabled = payload
    },

    SET_SEARCH_FIELD_TEXT(state, payload) {
      state.searchFieldText = payload
    }
  },

  actions: {
    enableSearchField({ commit }, payload) {
      commit('ENABLE_SEARCH_FIELD', payload)
    },

    setSearchFieldText({ commit }, payload) {
      commit('SET_SEARCH_FIELD_TEXT', payload)
    }
  }
})
