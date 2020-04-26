<template>
  <div>
    <h1>{{ book.title }}</h1>
  </div>
</template>

<script>
import BookService from '@/services/BookService.js'
export default {
  async asyncData({ error, params }) {
    try {
      const res = await BookService.getBook(parseInt(params.slug))
      const book = res.data
      book.coverImage = require('~/assets/img/la_tana_del_lupo.jpg')

      return {
        book
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

<style lang="scss" scoped></style>
