<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-weight-light">
              I nostri autori
            </h1>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          v-for="(autore, index) in autori"
          :key="index"
          class="column is-3-tablet is-3-desktop is-2-widescreen"
        >
          <article class="box">
            <div class="autore">
              <figure class="image is-128x128" style="margin-bottom: 8px;">
                <img
                  class="is-rounded"
                  :src="require(`~/assets/img/${autore.img}`)"
                />
              </figure>
              <div>
                <p class="title is-4 has-text-weight-light">
                  {{ autore.name }}
                </p>
                <!-- <p class="title is-4 is-spaced is-marginless"></p> -->
                <div class="content is-small">
                  <ul>
                    <li><a href="#">Titolo 1</a></li>
                    <li><a href="#">Titolo 2</a></li>
                    <li><a href="#">Titolo 3</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      autori: [
        {
          name: 'Pino Loperfido',
          img: '1.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '2.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '3.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '4.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '5.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '6.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '7.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '8.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        },
        {
          name: 'Pino Loperfido',
          img: '9.png',
          libri: ['Titolo 1', 'Titolo 2', 'Titolo 3']
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.autore {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
