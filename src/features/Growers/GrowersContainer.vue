<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ToastType from '../../support/ToastType'

export default {
  name: 'GrowersContainer',

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
