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

    <v-card>
      <v-card-title>
        <h3 class="headline mb-0">
          Produtores
        </h3>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="growersCollection"
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
            <td>
              <avatar
                v-if="props.item.name"
                :username="props.item.name"
                :size="40"
                class="ml-3"
              />
            </td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.cpf }}</td>
            <td width="100">
              <v-layout
                justify-space-between
                align-center
              >
                <v-btn
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

                <v-btn
                  flat
                  icon
                  @click.native="requestDestroyConfirmation(props.item)"
                >
                  <v-icon class="blue-grey--text text--darken-2">
                    delete
                  </v-icon>
                </v-btn>
              </v-layout>
            </td>
          </tr>
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
import { mapState } from 'vuex'
import Avatar from 'vue-avatar'
import ToastType from '../../support/ToastType'

export default {
  name: 'GrowerList',

  components: {
    Avatar
  },

  data: () => ({
    headers: [
      { text: '', value: '', align: 'left' },
      { text: 'Nome', value: 'name', align: 'left' },
      { text: 'CPF', value: 'cpf', align: 'left' },
      {
        text: '', value: '', align: 'right', sortable: false
      }
    ],
    filters: {
      type: ''
    },
    loading: false,
    productsCollection: [],
    growersCollection: []
  }),

  computed: {
    ...mapState(['searchFieldText'])
  },

  mounted() {
    this.getAll(1, 10)
  },

  methods: {
    getAll() {
      this.loading = true

      this.$http
        .get('/grower')
        .then(({ data }) => {
          this.growersCollection = data
          this.showToast('Produtores carregados.', ToastType.SUCCESS)
        })
        .catch(() => {
          this.showToast('Ocorreu um erro ao buscar os produtores.', ToastType.ERROR)
        })
        .finally(() => {
          this.loading = false
        })
    },

    requestDestroyConfirmation(item) {
      this.$refs.confirm.show(() => {
        this.destroy(item)
      })
    },

    destroy(item) {
      this.$http
        .delete(`/grower/${item.id}`)
        .then(() => {
          this.showToast('Produtor excluído com sucesso!', ToastType.SUCCESS)
          this.removeFromList(item)
        })
        .catch(() => {
          this.showToast('Ocorreu um erro ao excluir o produtor.', ToastType.ERROR)
        })
    },

    removeFromList(item) {
      const index = this.growersCollection.findIndex(grower => grower.id === item.id)

      if (index !== -1) {
        this.growersCollection.splice(index, 1)
      }
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
