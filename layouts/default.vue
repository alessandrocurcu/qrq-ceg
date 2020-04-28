<template>
  <div class="site">
    <the-navbar />
    <section class="site-content">
      <div>
        <nuxt :nuxt-child-key="$route.fullPath" />
      </div>
    </section>
    <the-footer />
  </div>
</template>

<script>
import TheNavbar from '~/components/UI/TheNavbar.vue'
import TheFooter from '~/components/UI/TheFooter.vue'
export default {
  components: {
    TheNavbar,
    TheFooter
  }
}
</script>
<style lang="scss" scoped>
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}
</style>
