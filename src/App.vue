<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense>
        <template
          v-for="(item, itemIndex) in items"
        >
          <v-list-group
            v-if="item.children"
            :key="itemIndex"
            v-model="item.model"
            no-action
          >
            <v-list-tile
              slot="activator"
            >
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  <div class="menu-text">
                    {{ item.text }}
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              :to="child.href"
              :disabled="child.disabled"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content class="ml-4">
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile
            v-else
            :key="itemIndex"
            :to="item.href"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                <div class="menu-text">
                  {{ item.text }}
                </div>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      dark
      clipped-left
      app
      color="blue darken-2"
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title class="ml-0 pl-3">
        <router-link to="/">
          <span class="font-weight-light">
            NAGRO APP
          </span>
        </router-link>
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
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  name: 'App',

  components: {
    Avatar
  },

  data: () => ({
    drawer: false,
    text: '',
    items: [
      {
        icon: 'person_add',
        text: 'Produtores',
        href: '/growers'
      }
    ]
  }),

  methods: {
    ...mapActions(['enableSearchField', 'setSearchFieldText']),

    setSearchValue() {
      this.setSearchFieldText(this.text)
    }
  }
}
</script>

<style>
span.font-weight-light {
  color: white;
  font-weight: bold;
}
</style>
