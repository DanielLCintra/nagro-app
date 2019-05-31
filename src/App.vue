<template>
  <v-app>
    <v-toolbar
      dark
      clipped-left
      app
      color="blue darken-2"
      fixed
    >
      <v-toolbar-title class="ml-0 pl-3">
        <span class="font-weight-light">NAGRO APP</span>
      </v-toolbar-title>

      <v-spacer/>

      <v-text-field
        v-model="text"
        clearable
        solo
        light
        prepend-inner-icon="search"
        placeholder="Pesquisar"
        class="search"
        @keyup="setSearchValue"
      />

      <v-menu
        bottom
        left
      >
        <v-btn
          slot="activator"
          color="primary"
          flat
        >
          <avatar
            :username="'User'"
            :size="40"
            class="ml-3"
          />
        </v-btn>

        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon class="icone_preto">
                account_circle
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              Meus dados
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="logoff()">
            <v-list-tile-avatar>
              <v-icon class="icone_preto">
                exit_to_app
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              Sair
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <growers-list />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Avatar from 'vue-avatar'
import GrowersList from './views/Growers/GrowersList.vue'
import ToastType from './support/ToastType'

export default {
  name: 'App',

  components: {
    GrowersList,
    Avatar
  },

  data: () => ({
    text: ''
  }),

  mounted() {
    this.getProperties()
  },

  methods: {
    ...mapActions(['setProperties', 'enableSearchField', 'setSearchFieldText',]),

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
    },

    setSearchValue() {
      this.setSearchFieldText(this.text)
    }
  }
}
</script>
