<template>
  <div>
    <section class="section">
      <b-carousel
        v-model="carousel"
        icon-pack="fas"
        icon-prev="arrow-left"
        icon-next="arrow-right"
        animated="fade"
        :has-drag="false"
        :autoplay="true"
        :pause-hover="true"
        :pause-info="false"
        :interval="4500"
        :repeat="true"
      >
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
          <section :class="`hero is-medium is-${carousel.color} is-bold`">
            <div class="hero-body has-text-centered">
              <h1 class="title">{{ carousel.title }}</h1>
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
    </section>
    <section class="section">
      <div class="columns is-multiline">
        <book-card v-for="book in bestBooks" :key="book.id" :book="book" />
      </div>
    </section>
    <section class="section">
      <b-field label="Ricerca per titolo o autore">
        <b-autocomplete
          :data="autocompleteData"
          icon-pack="fas"
          icon="search"
          placeholder="Cerca..."
          field="title"
          :loading="isFetching"
          :check-infinite-scroll="true"
          @typing="getAsyncData"
          @select="goToBook"
          @infinite-scroll="getMoreAsyncData"
        >
          <template slot-scope="props">
            <div class="media">
              <div class="media-left">
                <p class="image is-64x64">
                  <img :src="props.option.coverImage" />
                </p>
              </div>
              <div class="media-content">
                {{ props.option.title }}
                <br />
                <small>
                  Pubblicato {{ props.option.published }}, di
                  <b>{{ props.option.author }}</b>
                </small>
              </div>
            </div>
          </template>
          <template slot="footer">
            <span v-show="page > totalPages" class="has-text-grey">
              Thats it! No more movies found.
            </span>
          </template>
        </b-autocomplete>
      </b-field>
      <div class="columns is-multiline">
        <book-card v-for="book in books" :key="book.id" :book="book" />
      </div>
      <hr />
      <b-pagination
        icon-pack="fas"
        :total="totalBooks"
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
        <b-pagination-button
          :id="`page${props.page.number}`"
          slot-scope="props"
          :page="props.page"
          tag="nuxt-link"
          :to="`/?page=${props.page.number}`"
        >
          {{ props.page.number }}
        </b-pagination-button>

        <b-pagination-button
          slot="previous"
          slot-scope="props"
          :page="props.page"
          tag="nuxt-link"
          :to="{ name: 'index', query: { page: props.page.number } }"
        >
          Previous
        </b-pagination-button>

        <b-pagination-button
          slot="next"
          slot-scope="props"
          :page="props.page"
          tag="nuxt-link"
          :to="{ name: 'index', query: { page: props.page.number } }"
        >
          Next
        </b-pagination-button>
      </b-pagination>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState, mapGetters } from 'vuex'
import BookCard from '~/components/Books/BookCard.vue'

export default {
  name: 'HomePage',
  components: {
    BookCard
  },
  async fetch({ store, error, query }) {
    try {
      await store.dispatch('books/fetchBooks', {
        perPage: 6,
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
      perPage: 6,
      rangeBefore: 1,
      rangeAfter: 1,
      order: 'is-centered',
      size: 'is-small',
      isSimple: false,
      isRounded: true,
      selected: null,
      isFetching: false,
      name: '',
      page: 1,
      totalPages: 1,
      carousel: 0,
      carousels: [
        { title: 'Slide 1', color: 'dark' },
        { title: 'Slide 2', color: 'primary' },
        { title: 'Slide 3', color: 'info' },
        { title: 'Slide 4', color: 'success' },
        { title: 'Slide 5', color: 'warning' },
        { title: 'Slide 6', color: 'danger' }
      ]
    }
  },
  computed: {
    ...mapState({
      books: (state) => state.books.books,
      current: (state) => state.books.currentPage,
      totalBooks: (state) => state.books.totalBooks,
      autocompleteData: (state) => state.books.autocompleteData
    }),
    ...mapGetters({ bestBooks: 'books/bestBooks' })
  },
  watchQuery: ['page'],
  methods: {
    goToBook(option) {
      this.$router.push({
        path: `/libro/${option.id}`
      })
    },
    getAsyncData: debounce(function(name) {
      // String update
      if (this.name !== name) {
        this.name = name
        this.$store.commit('books/SET_AUTOCOMPLETE_DATA', [])
        // this.data = []
        this.page = 1
        this.totalPages = 1
      }
      // String cleared
      if (!name.length) {
        this.$store.commit('books/SET_AUTOCOMPLETE_DATA', [])
        // this.data = []
        this.page = 1
        this.totalPages = 1
        return
      }
      // Reached last page
      if (this.page > this.totalPages) {
        return
      }
      this.isFetching = true
      this.$store.dispatch('books/fetchAutocompleteBooks', {
        name,
        perPage: 10,
        page: this.page
      })

      // this.$axios
      //   .get(
      //     `https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}&page=${this.page}`
      //   )
      //   .then(({ data }) => {
      //     console.log(data)
      //     data.results.forEach((item) => this.data.push(item))

      //     this.page++
      //     this.totalPages = data.total_pages
      //   })
      //   .catch((error) => {
      //     throw error
      //   })
      //   .finally(() => {
      //     this.isFetching = false
      //   })
    }, 500),
    getMoreAsyncData: debounce(function() {
      console.log('bounce!')
      // this.getAsyncData(this.name)
    }, 250)
  }
}
</script>
