<template>
  <div>
    <the-navbar />
    <section class="section">
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import TheNavbar from '~/components/UI/TheNavbar.vue'
export default {
  components: {
    TheNavbar
  }
}
</script>
