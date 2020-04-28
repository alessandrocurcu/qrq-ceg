import apiClient from './ApiClient'

export default {
  getNews() {
    return apiClient.get('/news')
  }
}
