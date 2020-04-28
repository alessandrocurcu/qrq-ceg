<template>
  <b-navbar wrapper-class="container" :spaced="true" :transparent="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~/assets/img/logo.jpg"
          alt="Logo di Curcu e Genovese Associati"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/casa_editrice' }">
        Casa Editrice
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/libri' }">
        Libri
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/autori' }">
        Autori
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/contatti' }">
        Contatti
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="router-link" to="/login">
        <b-icon
          icon="user"
          size="is-small"
          style="margin-right: 0.5rem;"
        ></b-icon>
        login
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/carrello">
        <b-icon
          icon="shopping-cart"
          size="is-small"
          style="margin-right: 0.5rem;"
        ></b-icon>
        carrello
        <!-- <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div> -->
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  color: #016fb9;
}
</style>
