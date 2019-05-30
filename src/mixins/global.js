import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

Vue.mixin({
  data() {
    return {
      toastType: null
    }
  },

  computed: {
    ...mapState(['searchFieldText']),

    toolbarSearch() {
      return this.searchFieldText
    }
  },

  methods: {
    ...mapActions(['enableSearchField']),

    showToast(message, type) {
      this.toastType = type
      this.$refs.toast.show(message)
    }
  }
})
