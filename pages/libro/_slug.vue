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
