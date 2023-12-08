<template>
  <div class="cart-view">
    <div v-for="item in cartList" :key="item.id" class="cart-item">
      <p>
        {{ item.title }}
      </p>
      <p>Price: ${{ item.price }}</p>
      <button @click="decrement(item.id)">➖</button>
      <p>{{ item.count }}</p>
      <button @click="increment(item.id)">➕</button>
      <button @click="deleteProduct(item.id)">X</button>
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
  deleteProduct(itemId: number) {
    this.$store.commit('cart/deleteProduct', itemId)
  }
  increment(productId: number) {
    this.$store.commit('cart/increment', productId)
  }
  decrement(productId: number) {
    this.$store.commit('cart/decrement', productId)
  }
}
</script>

<style scoped lang="scss">
.cart-view {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 48px;

  .cart-item {
    display: flex;
    height: 100px;
    padding: 12px;
    border: 2px solid $black;
    border-radius: 20px;
    flex-grow: 1;
    align-items: center;

    p {
      margin: 0;
    }

    button {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      background-color: transparent;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.2);
      }
    }

    & > * {
      flex: 1;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
