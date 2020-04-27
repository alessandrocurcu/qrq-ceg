<template>
  <section>
    <div class="columns is-multiline">
      <book-card v-for="book in books" :key="book.id" :book="book" />
    </div>
    <hr />
    <b-pagination
      icon-pack="fas"
      :total="total"
      :current.sync="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      icon-prev="caret-left"
      icon-next="caret-right"
      aria-next-label="Pagina Successiva"
      aria-previous-label="Pagina Precedente"
      aria-page-label="Pagina"
      aria-current-label="Pagina Corrente"
    >
    </b-pagination>
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
  data() {
    return {
      total: 10,
      current: 1,
      perPage: 4,
      rangeBefore: 1,
      rangeAfter: 1,
      order: 'is-centered',
      size: 'is-small',
      isSimple: false,
      isRounded: true
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
