<template>
  <div>
    <section class="section endless-clouds">
      <div class="container">
        <b-carousel
          v-model="carousel"
          :indicator="false"
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
          <b-carousel-item v-for="(slide, i) in carousels" :key="i">
            <section :class="`hero is-medium ${slide.bgc}`">
              <div class="hero-body has-text-centered">
                <!-- <img
                  src="~/assets/img/slide1.jpg"
                  alt="Logo di Curcu e Genovese Associati"
                /> -->

                <!-- <h1 class="title">{{ slide.title }}</h1> -->
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>
    </section>
    <section class="section band">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <b-icon
                class="has-text-white-bis"
                icon="thumbs-up"
                size="is-medium"
              ></b-icon>
            </div>
            <div class="level-item">
              <h1 class="title has-text-weight-light has-text-white-bis">
                I più venduti
              </h1>
            </div>
          </div>
        </div>
        <b-carousel
          v-model="carousel2"
          :arrow="false"
          animated="slide"
          :has-drag="false"
          :autoplay="false"
          :pause-hover="false"
          :pause-info="false"
          :interval="4500"
          :repeat="true"
          :indicator-inside="false"
        >
          <b-carousel-item v-for="(slide, i) in carousels2" :key="i">
            <section class="hero is-medium is-bold">
              <div class="columns is-multiline">
                <book-card
                  v-for="book in bestBooks.slice(slide.start, slide.end)"
                  :key="book.id"
                  :book="book"
                  :title-size="4"
                />
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <b-icon icon="book" size="is-medium"></b-icon>
            </div>
            <div class="level-item">
              <h1 class="title has-text-weight-light">
                I nostri libri
              </h1>
            </div>
          </div>
        </div>
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
          <book-card
            v-for="book in books"
            :key="book.id"
            :column="{ tablet: 6, desktop: 4, widescreen: 3 }"
            :book="book"
          />
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
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <b-icon icon="newspaper" size="is-medium"></b-icon>
            </div>
            <div class="level-item">
              <h1 class="title has-text-weight-light">
                Ultime Notizie e Appuntamenti
              </h1>
            </div>
          </div>
          <div class="level-right">
            <nuxt-link to="/news" class="level-item has-text-weight-light"
              >Elenco completo</nuxt-link
            >
          </div>
        </div>
        <news-tile :news="news" />
      </div>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState } from 'vuex'
import BookCard from '~/components/Books/BookCard.vue'
import NewsTile from '~/components/News/NewsTile.vue'

export default {
  scrollToTop: false,
  name: 'HomePage',
  components: {
    BookCard,
    NewsTile
  },
  async fetch({ store, error, query }) {
    try {
      await store.dispatch('books/fetchBooks', {
        perPage: 12,
        page: query.page || 1
      })
      await store.dispatch('books/fetchBestBooks')
      await store.dispatch('news/fetchNews')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Non sono in grado di recuperare i dati'
      })
    }
  },
  data() {
    return {
      perPage: 12,
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
      carousel2: 0,
      carousels: [
        { title: 'Slide 1', bgc: 'slide3' },
        { title: 'Slide 2', bgc: 'slide2' },
        { title: 'Slide 2', bgc: 'slide1' }
      ],
      carousels2: [
        { start: 0, end: 3 },
        { start: 3, end: 6 }
      ]
    }
  },
  computed: {
    ...mapState({
      books: (state) => state.books.books,
      current: (state) => state.books.currentPage,
      totalBooks: (state) => state.books.totalBooks,
      autocompleteData: (state) => state.books.autocompleteData,
      bestBooks: (state) => state.books.bestBooks,
      news: (state) => state.news.news
    })
    // ...mapGetters({ bestBooks: 'books/bestBooks' })
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
<style lang="scss">
.label {
  font-weight: 300 !important;
}

.polka {
  background-color: rgb(255, 250, 245);
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.13' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}

.endless-clouds {
  background-color: rgb(255, 250, 245);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%239C92AC' fill-opacity='0.13' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
}

.band {
  // background-color: rgb(255, 179, 98);
  // background-image: linear-gradient(
  //   141deg,
  //   #c44307 0%,
  //   #e97c15 71%,
  //   #f2ab26 100%
  // );
  // background-color: #faff81;
  // background-color: #fdd774;
  // background-color: #ff7b00;
  // background: hsla(29, 100, 50);
  background: radial-gradient(
    circle,
    hsla(29, 100, 50, 1) 0%,
    hsla(357, 55, 46, 1) 100%
  );
}

.prova {
  clip-path: polygon(0 0, 100% 0, 100% 96%, 0 100%);
}

.slide1 {
  background-image: url('~assets/img/slide1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 6% 50%;
}

.slide2 {
  background-image: url('~assets/img/slide2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 6% 50%;
}

.slide3 {
  background-image: url('~assets/img/slide3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 6% 50%;
}
</style>
