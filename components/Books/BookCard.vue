<template>
  <div
    :class="
      `column is-${column.tablet}-tablet is-${column.desktop}-desktop is-${column.widescreen}-widescreen`
    "
    @click="goToBook(book.id)"
  >
    <article class="box book-card">
      <div class="media">
        <aside class="media-left">
          <img :src="book.coverImage" width="80" />
        </aside>
        <div class="media-content">
          <h1 class="title is-5 is-spaced is-marginless">
            <!-- <a @click="showEditModal = true">{{ book.title }}</a> -->
            {{ book.title }}
          </h1>
          <p class="subtitle is-marginless">{{ book.price }}</p>
          <div class="content is-small">
            {{ book.author }} <br />
            ISBN: {{ book.ISBN }}
            <br />
            <!-- <a @click="editBook(book)">Aggiugni al carrello</a> -->
            <!-- <a
              class="snipcart-add-item"
              data-item-id="starry-night"
              :data-item-price="book.price"
              data-item-url="/paintings/starry-night"
              data-item-description="libro descrizione"
              :data-item-name="book.title"
            >
              Aggiugni al carrello
            </a> -->
            <!-- <span>·</span>
                  <a @click="removeBook(index)">Delete</a> -->
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    column: {
      type: Object,
      default: () => {
        return { tablet: 12, desktop: 6, widescreen: 4 }
      }
    },
    book: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    goToBook(id) {
      this.$router.push({
        path: `/libro/${id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.book-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    @include box_shadow(3);
  }
}
</style>
