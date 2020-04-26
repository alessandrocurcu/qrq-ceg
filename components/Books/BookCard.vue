<template>
  <div class="column is-12-tablet is-6-desktop is-4-widescreen">
    <nuxt-link :to="`/libro/${book.slug}`">
      <article class="box">
        <div class="media">
          <aside class="media-left">
            <img :src="book.coverImage" width="80" />
          </aside>
          <div class="media-content">
            <p class="title is-5 is-spaced is-marginless">
              <a @click="showEditModal = true">{{ book.title }}</a>
            </p>
            <p class="subtitle is-marginless">€ {{ book.price }}</p>
            <div class="content is-small">
              {{ book.author }} <br />
              ISBN: {{ book.ISBN }}
              <br />
              <!-- <a @click="editBook(book)">Aggiugni al carrello</a> -->
              <a
                class="snipcart-add-item"
                data-item-id="starry-night"
                :data-item-price="book.price"
                data-item-url="/paintings/starry-night"
                data-item-description="libro descrizione"
                :data-item-name="book.title"
              >
                Aggiugni al carrello
              </a>
              <!-- <span>·</span>
                  <a @click="removeBook(index)">Delete</a> -->
            </div>
          </div>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>
