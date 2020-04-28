import NewsService from '~/services/NewsService.js'
export const state = () => ({
  news: []
})

export const mutations = {
  SET_NEWS(state, news) {
    state.news = news
  }
}

export const actions = {
  fetchNews({ commit }) {
    return NewsService.getNews().then((res) => {
      commit('SET_NEWS', res.data)
    })
  }
}
