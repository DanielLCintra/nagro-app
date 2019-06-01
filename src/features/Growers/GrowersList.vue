<template>
  <div>
    <toast
      ref="toast"
      :type="toastType"
    />

    <confirm-dialog
      ref="confirm"
      title="Confirma a exclusão deste produtor?"
      message="O produtor será apagado definitivamente e não poderá mais ser utilizado."
    />

    <v-card flat>
      <v-card-title>
        <h3 class="headline mb-0">
          Produtores
        </h3>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="growers.list"
        :rows-per-page-items="[10, 20, 40]"
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
            <td>
              <avatar
                v-if="props.item.name"
                :username="props.item.name"
                :size="40"
                class="ml-3"
              />
            </td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.cpf | cpfFormat }}</td>
            <td width="100">
              <v-layout
                justify-space-between
                align-center
              >
                <v-tooltip bottom>
                  <v-btn
                    slot="activator"
                    flat
                    icon
                    @click="showGrowerProperties(props)"
                  >
                    <v-icon
                      class="blue-grey--text text--darken-2"
                    >
                      store
                    </v-icon>
                  </v-btn>
                  <span>{{ props.expanded ? 'Esconder' : 'Mostrar' }} propriedades</span>
                </v-tooltip>

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

        <template
          slot="expand"
          slot-scope="props"
        >
          <v-card>
            <properties-list
              :grower-id="props.item.id"
            />
          </v-card>
        </template>
      </v-data-table>
    </v-card>

    <v-btn
      :to="{ name: 'growers.create' }"
      dark
      fab
      fixed
      bottom
      right
      color="pink"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Avatar from 'vue-avatar'
import ToastType from '../../support/ToastType'
import PropertiesList from '../Properties/PropertiesList.vue'

export default {
  name: 'GrowerList',

  components: {
    Avatar,
    PropertiesList
  },

  data: () => ({
    headers: [
      { text: '', value: '', align: 'left' },
      { text: 'Nome', value: 'name', align: 'left', sortable: true },
      { text: 'CPF', value: 'cpf', align: 'left', sortable: true },
      {
        text: '', value: '', align: 'right', sortable: false
      }
    ],
    filters: {
      type: ''
    },
    loading: false
  }),

  computed: {
    ...mapState([
      ['searchFieldText'],
      'growers', ['list']
    ])
  },

  methods: {
    ...mapActions('growers', ['getGrowers', 'removeGrower']),

    requestDestroyConfirmation(item) {
      this.$refs.confirm.show(() => {
        this.destroy(item)
      })
    },

    destroy({ id }) {
      this.loading = true

      this.removeGrower(id)
        .then(() => {
          this.showToast('Produtor excluído com sucesso!', ToastType.SUCCESS)
        })
        .catch(() => {
          this.showToast('Ocorreu um erro ao excluir o produtor.', ToastType.ERROR)
        })
        .finally(() => {
          this.loading = false
        })
    },

    showGrowerProperties(props) {
      props.expanded = !props.expanded
      this.$bus.$emit('get-grower-properties', { id: props.item.id })
    }
  }
}
</script>

<style scoped>
  a.v-btn.v-btn--bottom.v-btn--floating.v-btn--fixed.v-btn--right.v-btn--router.theme--dark.pink {
    color: #f5f5f5;
    background-color: #fd0139;
    border-color: #fd0139;
  }
</style>
