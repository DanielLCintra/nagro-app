<template>
  <div>
    <toast
      ref="toast"
      :type="toastType"
    />

    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">
          {{ title }}
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
import { mapGetters, mapActions } from 'vuex'
import Avatar from 'vue-avatar'
import ToastType from '../../support/ToastType'
import GrowerModel from '../../models/GrowerModel'

export default {
  name: 'GrowersRegister',

  components: {
    Avatar
  },

  props: {
    growerId: {
      type: [String, Number],
      default: null
    }
  },

  data: () => ({
    loading: false,
    grower: new GrowerModel()
  }),

  computed: {
    ...mapGetters('growers', ['getGrowerById']),

    isEditing() {
      return !!this.growerId
    },

    title() {
      return this.isEditing ? 'Editor produtor' : 'Inserir produtor'
    },

    successMessage() {
      return this.isEditing
        ? 'Produtor atualizado com sucesso.'
        : 'Produtor criado com sucesso.'
    }
  },

  watch: {
    growerId: {
      handler(value) {
        if (value) {
          const grower = this.getGrowerById(value)
          this.grower = grower
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('growers', ['addGrower', 'updateGrower']),

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

      if (this.isEditing) {
        this.update()
      } else {
        this.insert()
      }
    },

    update() {
      this.updateGrower(this.grower)
        .then(() => {
          this.showToast(this.successMessage, ToastType.SUCCESS)
          setTimeout(() => {
            this.$router.push({ name: 'growers.list' })
          }, 3000)
        })
        .catch(() => {
          this.showToast('Houve um erro ao adicionar o produtor.', ToastType.ERROR)
        })
        .finally(() => {
          this.loading = false
        })
    },

    insert() {
      this.addGrower(this.grower)
        .then(() => {
          this.showToast(this.successMessage, ToastType.SUCCESS)
          setTimeout(() => {
            this.$router.push({ name: 'growers.list' })
          }, 1000)
        })
        .catch(() => {
          this.showToast('Houve um erro ao adicionar o produtor.', ToastType.ERROR)
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
