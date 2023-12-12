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
    <div class="cart-view__total">
      <p><strong>Total Price:</strong> ${{ totalPrice }}</p>
      <BaseButton text="Clear Cart" @click.native="clearCart" />
    </div>
  </div>
</template>

<script lang="ts">
import { IProduct } from '@/interfaces/products'
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'

@Component({
  components: {
    BaseButton,
  },
})
export default class CartView extends Vue {
  get cartList(): IProduct[] {
    return this.$store.state.cart.cartList
  }
  get totalPrice(): number {
    return this.cartList.reduce((total, item) => total + (item?.price || 0) * (item?.count || 0), 0)
  }
  increment(productId: number) {
    this.$store.commit('cart/increment', productId)
  }
  decrement(productId: number) {
    this.$store.commit('cart/decrement', productId)
  }
  deleteProduct(itemId: number) {
    this.$store.commit('cart/deleteProduct', itemId)
  }
  clearCart() {
    this.$store.commit('cart/clearCart')
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
  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid $black;
    padding: 12px;
    border-radius: 20px;
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
      height: 100%;
      align-items: center;
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
