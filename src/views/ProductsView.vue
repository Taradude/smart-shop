<template>
  <div class="products-view">
    <div v-for="item in productsList" :key="item.id" class="product" @click="goToItemPage(item)">
      <h3 class="product__title">{{ item.title }}</h3>
      <img class="product__img" :src="item.images[0]" alt="photo" />
      <p class="product__rating">⭐Rating : {{ item.rating }}</p>
      <p class="product__price">💲Price : ${{ item.price }}</p>
      <BaseButton text="Buy" @click.native="addToCart(item)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IProduct } from '@/interfaces/products'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'

@Component({
  components: {
    BaseButton,
  },
})
export default class ProductsView extends Vue {
  get productsList(): any {
    return this.$store.state.products.productsList
  }
  addToCart(product: IProduct): void {
    this.$store.commit('cart/addProduct', product)
  }
  goToItemPage(product: IProduct): void {
    this.$store.commit('products/setCurrentProduct', product)
    this.$router.push({
      name: 'ProductItemView',
      params: { name: product.title.replace(/\s/g, '-').toLowerCase() },
    })
  }
}
</script>

<style lang="scss" scoped>
.products-view {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
  gap: 16px;
}
.product {
  position: relative;
  overflow-x: hidden;
  border: 3px solid $black;
  border-radius: 15px;
  height: 450px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

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
