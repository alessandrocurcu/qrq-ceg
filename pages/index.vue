<template>
  <section>
    <book-card v-for="book in books" :key="book.id" :book="book" />
  </section>
</template>

<script>
import BookCard from '~/components/Books/BookCard.vue'
export default {
  name: 'HomePage',
  components: {
    BookCard
  },
  async asyncData({ $axios }) {
    const res = await $axios.get('http://localhost:4000/books')
    const books = res.data

    return {
      books
    }
  },
  data() {
    return {
      // book: {
      //   id: 1,
      //   ISBN: 1762167,
      //   title: 'Catcher in the ray',
      //   price: '23.00',
      //   author: 'Salinger',
      //   coverImage: 'http://lorempixel.com/400/200',
      //   published: '12/01/2020'
      // }
    }
  }
}
</script>
