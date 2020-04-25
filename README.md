# nuxt-qrq-boilerplate

> My great Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Expose local host to external devices
* Get your IP in the terminal with `ipconfig getifaddr en1`
* In `paclage.json` update dev script with `HOST=<your ip> nuxt`

# Buefy
## Customization
* `css` in the costructor option in `nuxt.config.js` must be `false` otherwise you will inject Bulma styles twice in every page
```js
modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { css: false, materialDesignIcons: false }],
  ],
```
* Create a file in `assets` like `scss/main.scss`
* In that file write the following (Look at Buefy's doc for more information)
```js
@import "~bulma/sass/utilities/_all";

// Example change primary color
$primary: salmon;
$primary-invert: blue;
$colors: (

    "primary": ($primary, $primary-invert),

);

@import "~bulma";
@import "~buefy/src/scss/buefy";
```
# Font Awesome 5 Free
If you want to install Font Awesome from NPM and make it work with Buefy follow these instructions:

1. Install nuxt-fontawesome and some dependencies

```bash
npm i nuxt-fontawesome
npm i @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome
```

2. Install an icon set, for example:

```bash
npm i @fortawesome/free-solid-svg-icons
```

3. Edit nuxt.config.js as follows:

```js
modules: [
  'nuxt-buefy',
  'nuxt-fontawesome'
],
buefy: {
  materialDesignIcons: false,
  defaultIconPack: 'fas',
  defaultIconComponent: 'font-awesome-icon'
},
fontawesome: {
  imports: [
    {
      set: '@fortawesome/free-solid-svg-icons',
      icons: ['fas']
    }
  ]
}
```

4. Usage example:
```html
<b-icon pack="fas" icon="home" size="is-large" />
```
