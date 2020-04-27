import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  // baseURL: `https://my-json-server.typicode.com/alessandrocurcu/qrq-ceg`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

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
