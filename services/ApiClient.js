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

export default apiClient
