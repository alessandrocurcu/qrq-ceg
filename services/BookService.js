import axios from 'axios'

const apiClient = axios.create({
  // baseURL: `http://localhost:4000`,
  baseURL: `https://my-json-server.typicode.com/alessandrocurcu/qrq-ceg`,
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
  }
}
