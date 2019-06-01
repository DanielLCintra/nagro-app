<template>
  <v-snackbar
    v-model="visible"
    :color="type"
    :timeout="3000"
    bottom
    left
  >
    {{ message }}
    <v-btn
      dark
      flat
      @click.native="hide"
    >
      OK
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Toast',

  props: {
    type: {
      type: String,
      default: 'info'
    }
  },

  data() {
    return {
      message: null,
      visible: false
    }
  },

  methods: {
    show(message) {
      this.message = message
      this.visible = true
    },

    hide() {
      this.message = null
      this.visible = false
    }
  }
}
</script>
