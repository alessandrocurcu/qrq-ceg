import BookService from '~/services/BookService.js'
export const state = () => ({
  books: [],
  book: {},
  currentPage: 1,
  totalBooks: 10
})

export const mutations = {
  SET_BOOKS(state, books) {
    state.books = books
  },
  SET_BOOK(state, book) {
    state.book = book
  },
  SET_CURRENT_PAGE(state, currentPage) {
    state.currentPage = currentPage
  },
  SET_TOTAL_NUMBER_OF_BOOKS(state, totalBooks) {
    state.totalBooks = totalBooks
  }
}

export const actions = {
  fetchBooks({ commit }, { perPage, page }) {
    return BookService.getBooks(perPage, page).then((res) => {
      commit('SET_BOOKS', res.data)
      commit('SET_CURRENT_PAGE', parseInt(page))
      commit('SET_TOTAL_NUMBER_OF_BOOKS', res.headers['x-total-count'])
    })
  },
  fetchBook({ commit }, id) {
    return BookService.getBook(id).then((res) => {
      commit('SET_BOOK', res.data)
    })
  }
}

export const getters = {
  // totalBooks: (state) => state.books.length,
  getBookById: (state) => (id) => state.books.find((book) => book.id === id)
}
