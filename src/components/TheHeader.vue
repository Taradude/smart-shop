<template>
  <header class="header">
    <nav>
      <router-link to=""> Home Page</router-link>
      <router-view />
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
}
</style>
