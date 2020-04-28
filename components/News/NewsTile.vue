<template>
  <div class="tile is-ancestor">
    <div class="tile is-8 is-vertical is-parent">
      <article
        v-for="item in newsNews"
        :key="item.id"
        class="tile is-child box"
      >
        <h2 class="title is-4 has-text-weight-normal">{{ item.title }}</h2>
        <p class="subtitle is-6 has-text-weight-light">
          Notizia | {{ item.published }}
        </p>
        <div class="content">
          <p>{{ item.text }}</p>
          <!-- <nuxt-link to="/">Leggi</nuxt-link> -->
        </div>
      </article>
    </div>
    <!-- <div class="tile"></div>
    <div class="tile"></div> -->
    <div v-if="appointments.length > 0" class="tile is-parent is-vertical">
      <article
        v-for="item in appointments"
        :key="item.id"
        class="tile is-child"
        :class="item.callout ? 'notification is-primary' : 'box'"
      >
        <h2 class="title is-5 has-text-weight-normal">{{ item.title }}</h2>
        <p class="subtitle is-7 has-text-weight-light">
          Appuntamenti | {{ item.published }}
        </p>
        <div class="content">
          <p>{{ item.text }}</p>
        </div>
      </article>
    </div>
    <div v-else class="tile is-parent">
      <article class="tile is-child box">
        <div class="content has-text-centered">
          <p class="subtitle is-6 is-italic">Nessun Appuntamento</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    newsNews() {
      return this.news.filter((news) => news.type)
    },
    appointments() {
      return this.news.filter((news) => !news.type)
    }
  }
}
</script>

<style lang="scss" scoped></style>
