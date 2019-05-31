<template>
  <div>
    <toast
      ref="toast"
      :type="toastType"
    />

    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">
          Produtores
        </h3>
      </v-card-title>

      <v-card-text>
        <v-container
          fluid
          grid-list-md
        >
          <v-progress-linear
            v-if="loading"
            color="secondary"
            height="2"
            value="15"
            :indeterminate="true"
          />
          <v-layout
            row
            wrap
          >
            <v-flex xs1>
              <avatar
                :username="grower.name ? grower.name : 'Sem Nome'"
                :size="50"
                class="vue-avatar"
              />
            </v-flex>

            <v-flex xs5>
              <v-text-field
                v-model="grower.name"
                name="name"
                label="Nome completo"
                color="blue accent-3"
                outline
                required
              />
            </v-flex>

            <v-flex xs5>
              <v-text-field
                v-model="grower.cpf"
                name="name"
                label="CPF"
                color="blue accent-3"
                outline
                required
                :mask="'###.###.###-##'"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn
          class="blue--text"
          flat
          :to="{name: 'growers.list'}"
        >
          Voltar
        </v-btn>

        <v-btn
          :loading="loading"
          class="elevation-0 info"
          @click="handleSubmit()"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import Avatar from 'vue-avatar'
import ToastType from '../../support/ToastType'

export default {
  name: 'GrowersRegister',

  components: {
    Avatar
  },

  props: {
    growerId: {
      type: [String, Number],
      default: ''
    }
  },

  data: () => ({
    loading: false,
    grower: {
      id: null,
      name: null,
      cpf: null
    }
  }),

  computed: {
    isEditing() {
      return !!this.growerId
    },

    apiUrl() {
      return this.isEditing ? `/grower/${this.growerId}` : '/grower'
    },

    httpVerb() {
      return this.isEditing ? 'put' : 'post'
    },

    successMessage() {
      return this.isEditing
        ? 'Produtor atualizado com sucesso.'
        : 'Produtor criado com sucesso.'
    }
  },

  created() {
    this.isEditing
  },

  methods: {
    handleSubmit() {
      if (this.grower.name === null) {
        this.showToast('Você precisa informar um nome', ToastType.WARNING)
        return
      }

      if (this.grower.cpf === null) {
        this.showToast('Você precisa informar um cpf', ToastType.WARNING)
        return
      }

      this.loading = true
      this.rules = []

      this
        .$http[this.httpVerb](this.apiUrl, this.grower)
        .then(({ data }) => {
          this.showToast(this.successMessage, ToastType.SUCCESS)
          this.$bus.$emit('grower-created', { grower: data })
          this.$router.push({ name: 'growers.list' })
        })
        .catch(({ response }) => {
          this.rules = response.data.errors
          this.showToast(response.data.message, ToastType.ERROR)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
