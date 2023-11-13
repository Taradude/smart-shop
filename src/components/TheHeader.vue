<template>
  <header class="header">
    <nav class="header__nav">
      <router-link :to="{ name: 'HomeView' }"> Home </router-link>
      <router-link :to="{ name: 'ProductsView' }"> Products</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="scss">
.header {
  padding: 32px 48px;
  background-color: $blue;

  &__nav {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>
