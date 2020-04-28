<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-weight-light">
              {{ book.title }}
              <nuxt-link to="/autori"
                ><small
                  ><em>di {{ book.author }}</em></small
                ></nuxt-link
              >
            </h1>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <img :src="book.coverImage" alt="" />
        </div>
        <div class="column">
          <div class="content is-medium">
            <p class="subtitle is-6 is-marginless">ISBN {{ book.ISBN }}</p>
            <p class="subtitle is-6 is-marginless">
              pubblicato il {{ book.published }}
            </p>
            <h2
              class="subtitle is-4 is-marginless"
              style="margin-top: 1.5rem !important; margin-bottom: 0.5rem !important"
            >
              Breve riassunto
            </h2>
            <p class="">{{ book.briefDescription }}</p>
            <p class="subtitle is-5">{{ book.stock }} disponibili</p>
            <p class="subtitle is-5">Prezzo : {{ book.price }}</p>
            <b-button icon-left="cart-plus" size="is-large" type="is-primary"
              >Aggiungi al carrello</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('books/fetchBook', parseInt(params.slug))
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
