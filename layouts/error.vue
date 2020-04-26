<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss"></style>
