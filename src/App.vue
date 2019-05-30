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
import GrowersList from './views/Growers/GrowersList.vue'

export default {
  name: 'App',

  components: {
    GrowersList
  },

  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.getGrowers()
  },

  methods: {
    getGrowers() {
      this.$http.get('/grower')
        .then((response) => {
          this.list = response
        })
    }
  }
}
</script>
