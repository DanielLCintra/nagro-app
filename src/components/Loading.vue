<template>
  <div
    v-if="visible"
    class="loading-wrapper"
  >
    <v-progress-circular
      indeterminate
      size="100"
      class="primary--text"
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .loading-wrapper {
    display:flex;
    align-items:center;
    justify-content: center;
    height:100%
  }
</style>
