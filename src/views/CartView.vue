<template>
  <div class="cart-view">
    <div class="cart-view__header">
      <p>Name</p>
      <p>Item price</p>
      <p>Quantity</p>
      <p>Delete item</p>
    </div>
    <div v-for="item in cartList" :key="item.id" class="cart-item">
      <p>
        {{ item.title }}
      </p>
      <p>Price: ${{ item.price }}</p>
      <div class="cart-item__buttons">
        <button @click="decrement(item.id)">➖</button>
        <p>{{ item.count }}</p>
        <button @click="increment(item.id)">➕</button>
      </div>
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

  &__header {
    display: flex;
    border: 2px solid $black;
    border-radius: 20px;
    align-items: center;

    p {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .cart-item {
    display: flex;
    height: 84px;
    padding: 12px;
    border: 2px solid $black;
    border-radius: 20px;
    flex-grow: 1;
    align-items: center;

    p {
      margin: 0;
    }
    &__buttons {
      display: flex;
      gap: 64px;
      justify-content: center;
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
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
