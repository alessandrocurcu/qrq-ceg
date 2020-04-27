<template>
  <section>
    <div class="columns is-multiline">
      <book-card v-for="book in books" :key="book.id" :book="book" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import BookCard from '~/components/Books/BookCard.vue'

export default {
  name: 'HomePage',
  components: {
    BookCard
  },
  async fetch({ store, error, query }) {
    try {
      await store.dispatch('books/fetchBooks', {
        perPage: 4,
        page: query.page || 1
      })
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Non sono in grado di recuperare i dati'
      })
    }
  },
  computed: {
    ...mapState({
      books: (state) =>
        state.books.books.map((book) => {
          book.coverImage = require('~/assets/img/la_tana_del_lupo.jpg')
          return book
        })
    })
    // ...mapGetters({ getBookById: 'books/getBookById' })
  }
}
</script>
