<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="400"
  >
    <v-card>
      <v-card-title>
        <div class="headline">
          {{ title }}
        </div>
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          class="blue--text"
          flat
          @click="dialog = false">
          Cancelar
        </v-btn>

        <v-btn
          class="elevation-0 info"
          @click="confirmed">
          Sim
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: {
    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      callback: null
    }
  },

  methods: {
    show(callback) {
      this.dialog = true
      this.callback = callback
    },

    confirmed() {
      this.callback()
      this.dialog = false
    }
  }
}
</script>
