<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~/assets/img/logo.jpg"
          alt="Logo di Curcu e Genovese Associati"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/libro/prova-uno' }">
        Primo Link
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/libro/prova-due' }">
        Secondo Link
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>

<style lang="scss" scoped></style>
