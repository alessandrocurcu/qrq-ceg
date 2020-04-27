import BookService from '~/services/BookService.js'
export const state = () => ({
  books: [],
  book: {},
  currentPage: 1
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
  }
}

export const actions = {
  fetchBooks({ commit }, { perPage, page }) {
    return BookService.getBooks(perPage, page).then((res) => {
      commit('SET_BOOKS', res.data)
      commit('SET_CURRENT_PAGE', parseInt(page))
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
