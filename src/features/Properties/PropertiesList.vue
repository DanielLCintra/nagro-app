<template>
  <div>
    <v-card flat>
      <v-card-title>
        <h3 class="headline mb-0">
          Propriedades
        </h3>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="propertiesList"
        :rows-per-page-items="[5, 10, 20, 40]"
        :loading="loading"
        :search="searchFieldText"
        no-data-text="Sem dados para exibir"
        no-results-text="Nenhum registro foi encontrado"
      >
        <template
          slot="items"
          slot-scope="props"
        >
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.total_area }}</td>
            <td>{{ props.item.city }}</td>
            <td width="100">
              <v-layout
                justify-space-between
                align-center
              >
                <v-tooltip bottom>
                  <v-btn
                    slot="activator"
                    :to="{ name: 'growers.update', params: { id: props.item.id } }"
                    flat
                    icon
                  >
                    <v-icon
                      class="blue-grey--text text--darken-2"
                    >
                      edit
                    </v-icon>
                  </v-btn>
                  <span>Editar</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <v-btn
                    slot="activator"
                    flat
                    icon
                    @click.native="requestDestroyConfirmation(props.item)"
                  >
                    <v-icon class="blue-grey--text text--darken-2">
                      delete
                    </v-icon>
                  </v-btn>
                  <span>Excluir</span>
                </v-tooltip>
              </v-layout>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PropertiesList',

  props: {
    growerId: {
      type: Number,
      default: 1
    }
  },

  data: () => ({
    headers: [
      { text: 'Propriedade', value: 'name', align: 'left' },
      { text: 'Área total', value: 'total_area', align: 'left' },
      { text: 'Cidade', value: 'city', align: 'left' },
      {
        text: '', value: '', align: 'right', sortable: false
      }
    ],
    loading: false
  }),

  computed: {
    ...mapState([
      'properties', ['list']
    ]),

    propertiesList() {
      return this.$store.getters.getGrowerPropertiesById(this.growerId)
    }
  }
}
</script>

<style>

</style>
