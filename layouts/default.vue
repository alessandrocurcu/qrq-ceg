<template>
  <div>
    <the-navbar />
    <section>
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
