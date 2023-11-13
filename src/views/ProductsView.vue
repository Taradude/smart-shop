<template>
  <div class="products-view">
    <div v-for="item in productsList" :key="item.id" class="products-view__product" @click="redirect">
      <h3>{{ item.title }}</h3>
      <p>Brand: {{ item.brand }}</p>
      <img :src="item.images[0]" alt="photo" />
      <p>⭐Rating : {{ item.rating }}</p>
      <p class="price">💲Price : ${{ item.price }}</p>
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

  &__product {
    padding: 5px;
    border: 2px solid $black;
    border-radius: 15px;
    height: 350px;
  }
}
.products-view__product > h3 {
  padding: 10px;
}
.products-view__product > img {
  width: 60%;
  height: 60%;
  text-align: center;
  border-radius: 20px;
}

.price {
  font-weight: bold;
}
</style>
