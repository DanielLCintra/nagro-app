<template>
  <v-app>
    <v-toolbar class="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">NAGRO APP</span>
      </v-toolbar-title>
      <v-spacer/>
    </v-toolbar>

    <v-content>
      <growers-list />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import GrowersList from './views/Growers/GrowersList.vue'
import ToastType from './support/ToastType'

export default {
  name: 'App',

  components: {
    GrowersList
  },

  mounted() {
    this.getProperties()
  },

  methods: {
    ...mapActions(['setProperties']),

    getProperties() {
      this.$http
        .get('/properties')
        .then(({ data }) => {
          this.setProperties(data)
          this.showToast('Propriedas carregadas com sucesso.', ToastType.SUCCESS)
        })
        .catch(() => {
          this.showToast('Ocorreu um erro ao buscar as propriedades.', ToastType.ERROR)
        })
    }
  }
}
</script>
