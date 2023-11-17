<template>
  <header class="header">
    <img
      id="logo"
      src="https://smart-shop-ua.com.ua/image/catalog/B974BF4F-E858-4496-98B3-565C2A7FCFCE-1681596281.png"
      alt=""
    />
    <nav class="header__nav">
      <router-link :to="{ name: 'HomeView' }"> <h3>Home</h3> </router-link>
      <router-link :to="{ name: 'ProductsView' }"> <h3>Products</h3></router-link>
      <router-link :to="{ name: 'CartView' }"> <h3>Cart</h3></router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="scss" scoped>
#logo {
  height: 100px;
  width: 360px;
}
.header {
  padding: 32px 48px;
  background-color: $blue;
  border-radius: 64px;
  width: 98%;
  margin: 0 auto;

  &__nav {
    display: flex;
    justify-content: center;
    gap: 25px;
  }
}
</style>
