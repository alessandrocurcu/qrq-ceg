import BookService from '~/services/BookService.js'
export const state = () => ({
  books: []
})

export const mutations = {
  SET_BOOKS(state, books) {
    state.books = books
  }
}

export const actions = {
  fetchBooks({ commit }) {
    return BookService.getBooks().then((res) => {
      commit('SET_BOOKS', res.data)
    })
  }
}

export const getters = {
  getBookById: (state) => (id) => state.books.find((book) => book.id === id)
}
