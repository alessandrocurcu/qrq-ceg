<template>
  <section>
    <div class="columns is-multiline">
      <book-card v-for="book in books" :key="book.id" :book="book" />
    </div>
  </section>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import BookCard from '~/components/Books/BookCard.vue'
import BookService from '~/services/BookService.js'

export default {
  name: 'HomePage',
  components: {
    BookCard
  },
  async asyncData({ error }) {
    try {
      const res = await BookService.getBooks()
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
  // computed: {
  //   ...mapState({ prova: (state) => state.books.prova }),
  //   ...mapGetters({ getBookById: 'books/getBookById' })
  // }
}
</script>
