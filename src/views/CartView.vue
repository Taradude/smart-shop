<template>
  <div class="cart-view">
    <p>
      {{ currentProduct.title }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CartView extends Vue {
  get currentProduct(): any {
    return this.$store.state.products.currentProduct
  }
}
</script>

<style scoped></style>
