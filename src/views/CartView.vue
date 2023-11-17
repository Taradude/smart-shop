<template>
  <div class="cart-view">
    <div v-for="item in cartList" :key="item.id" class="cart-item">
      <p>
        {{ item.title }}
      </p>
      <p>
        {{ item.price }}
      </p>
      <button>X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { IProduct } from '@/interfaces/products'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CartView extends Vue {
  get cartList(): IProduct[] {
    return this.$store.state.cart.cartList
  }
}
</script>

<style scoped lang="scss">
.cart-view {
  display: flex;
  flex-direction: column;
  gap: 48px;

  .cart-item {
    display: flex;
    justify-content: space-between;
  }
}
</style>
