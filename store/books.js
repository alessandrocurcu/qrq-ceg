import BookService from '~/services/BookService.js'
export const state = () => ({
  books: [],
  book: {}
})

export const mutations = {
  SET_BOOKS(state, books) {
    state.books = books
  },
  SET_BOOK(state, book) {
    state.book = book
  }
}

export const actions = {
  fetchBooks({ commit }, { perPage, page }) {
    return BookService.getBooks(perPage, page).then((res) => {
      commit('SET_BOOKS', res.data)
    })
  },
  fetchBook({ commit }, id) {
    return BookService.getBook(id).then((res) => {
      commit('SET_BOOK', res.data)
    })
  }
}

export const getters = {
  getBookById: (state) => (id) => state.books.find((book) => book.id === id)
}
