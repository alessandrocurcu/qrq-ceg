import apiClient from './ApiClient'

export default {
  getBooks(perPage, page) {
    return apiClient.get(`/books?_limit=${perPage}&_page=${page}`)
  },
  getBook(id) {
    return apiClient.get(`/books/${id}`)
  },
  getAutocompleteBooks(name, perPage, page) {
    return apiClient.get(`/books?q=${name}&_limit=${perPage}&_page=${page}`)
  },
  getBestBooks() {
    return apiClient.get(`/books?best=${true}`)
  }
}
