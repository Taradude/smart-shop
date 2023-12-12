<template>
  <div class="products-view">
    <div class="products-view__list">
      <div v-for="item in productsList" :key="item.id" class="product" @click="goToItemPage(item)">
        <h3 class="product__title">{{ item.title }}</h3>
        <img class="product__img" :src="item.images[0]" alt="photo" />
        <p class="product__rating">⭐Rating : {{ item.rating }}</p>
        <p class="product__price">Price : ${{ item.price }}</p>
        <BaseButton class="product__button" text="Buy" @click.native.stop="addToCart(item)" />
      </div>
    </div>
    <div class="products-view__buttons">
      <BaseButton :isDisabled="isPrevButtonDisabled" text="Previous page" @click.native="prevPage" />
      <div v-for="item in pagesAmount" :key="item" @click="goToPage(item)">{{ item }}</div>
      <BaseButton :isDisabled="isNextButtonDisabled" text="Next page" @click.native="nextPage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IProduct } from '@/interfaces/products'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'

@Component({
  components: {
    BaseButton,
  },
})
export default class ProductsView extends Vue {
  get productsList(): IProduct[] {
    return this.$store.state.products.productsList
  }
  get currentPage(): number {
    return this.$store.state.products.currentPage
  }
  get isPrevButtonDisabled(): boolean {
    return this.currentPage <= 1
  }
  get pagesAmount(): number {
    return this.$store.state.products.pagesAmount
  }
  get isNextButtonDisabled(): boolean {
    return (
      this.currentPage >=
      Math.ceil(this.$store.state.products.productsAmount / this.$store.state.products.productsLimit)
    )
  }
  @Watch('currentPage')
  watchCurrentPage() {
    this.$route.params.currentPage = String(this.currentPage)
    console.log(this.$route.params)
  }
  goToPage(page: number) {
    this.$store.commit('products/setCurrentPage', page)
    this.$store.dispatch('products/getProducts')
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
  prevPage(): void {
    this.$store.dispatch('products/prevPage')
  }
  nextPage(): void {
    this.$store.dispatch('products/nextPage')
  }
}
</script>

<style lang="scss" scoped>
.products-view {
  &__list {
    width: 90%;
    margin: 0 auto;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
    gap: 16px;
  }
  &__buttons {
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }
  &__buttons > button:disabled {
    background-color: $grey;
    cursor: default;
  }
}

.product {
  display: grid;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
  overflow-x: hidden;
  border: 3px solid $black;
  border-radius: 15px;
  width: 300px;
  height: 450px;
  overflow: hidden;
  padding: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  &__title {
    padding: 10px;
  }

  &__img {
    width: 100%;
    height: 200px;
    border-radius: 20px;
  }

  &__price {
    font-weight: bold;
  }

  &__button {
    transition: all 0.25s ease-in-out;
    max-height: 50px;
  }
  &__button:hover {
    background-color: $orange;
    color: $black;
  }
}
</style>
