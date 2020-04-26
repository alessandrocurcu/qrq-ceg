<template>
  <section>
    <div class="columns is-multiline">
      <book-card v-for="book in books" :key="book.id" :book="book" />
    </div>
  </section>
</template>

<script>
import BookCard from '~/components/Books/BookCard.vue'
export default {
  name: 'HomePage',
  components: {
    BookCard
  },
  async asyncData({ $axios, error }) {
    try {
      const res = await $axios.get('/books')
      const books = res.data.map((book) => {
        book.coverImage = require('~/assets/img/la_tana_del_lupo.jpg')
        return book
      })

      return {
        books
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Non sono in grado di recuperare i dati'
      })
    }
  }
}
</script>
