import BookService from '~/services/BookService.js'
export const state = () => ({
  books: [],
  book: {},
  currentPage: 1,
  totalBooks: 11,
  autocompleteData: [],
  bestBooks: []
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
  },
  SET_AUTOCOMPLETE_DATA(state, books) {
    state.autocompleteData = books
  },
  SET_BEST_BOOKS(state, books) {
    state.bestBooks = books.slice(0, 8)
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
  },
  fetchAutocompleteBooks({ commit }, { name, perPage, page }) {
    return BookService.getAutocompleteBooks(name, perPage, page).then((res) => {
      commit('SET_AUTOCOMPLETE_DATA', res.data)
    })
  },
  fetchBestBooks({ commit }) {
    return BookService.getBestBooks().then((res) => {
      commit('SET_BEST_BOOKS', res.data)
    })
  }
}

export const getters = {
  // totalBooks: (state) => state.books.length,
  // bestBooks: (state) => state.books.filter((book) => book.best).slice(0, 3),
  getBookById: (state) => (id) => state.books.find((book) => book.id === id)
}
