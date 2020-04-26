<template>
  <div>
    <h1>{{ book.title }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('books/fetchBook', parseInt(params.slug))

      // book.coverImage = require('~/assets/img/la_tana_del_lupo.jpg')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Non sono in grado di recuperare i dati'
      })
    }
  },
  computed: {
    ...mapState({ book: (state) => state.books.book })
  }
}
</script>

<style lang="scss" scoped></style>
