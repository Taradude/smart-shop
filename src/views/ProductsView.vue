<template>
  <div class="products-view">
    <div v-for="item in productsList" :key="item.id" class="product" @click="redirect">
      <h3 class="product__title">{{ item.title }}</h3>
      <p class="product__brand">Brand: {{ item.brand }}</p>
      <img class="product__img" :src="item.images[0]" alt="photo" />
      <p class="product__rating">⭐Rating : {{ item.rating }}</p>
      <p class="product__price">💲Price : ${{ item.price }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ProductsView extends Vue {
  get productsList(): any {
    return this.$store.state.products.productsList
  }
  redirect(): void {
    this.$router.push('product-item')
  }
}
</script>

<style lang="scss">
.products-view {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
  gap: 16px;
}
.product {
  padding: 5px;
  border: 2px solid $black;
  border-radius: 15px;
  height: 350px;

  &__title {
    padding: 10px;
  }

  &__img {
    width: 60%;
    height: 60%;
    text-align: center;
    border-radius: 20px;
  }
  &__price {
    font-weight: bold;
  }
}
</style>
