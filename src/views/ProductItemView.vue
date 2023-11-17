<template>
  <div class="product-item-view">
    <h3 class="product-item-view__title">Brand : {{ currentProduct.title }}</h3>
    <div class="img-slider">
      <BaseButton v-if="checkImgLength()" text="Previous" @click.native="prevSlide" />
      <img
        v-for="(image, index) in currentProduct.images"
        :key="index"
        class="img-slider__img"
        v-show="index === currentSlide"
        :src="image"
        alt="photo"
      />
      <BaseButton v-if="checkImgLength()" text="Next" @click.native="nextSlide" />
    </div>
    <p class="product-item-view__description">
      <strong>Description :</strong> {{ currentProduct.description }}
    </p>
    <BaseButton text="Add to cart" @click.native="addToCart" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import { IProduct } from '@/interfaces/products'

@Component({
  components: {
    BaseButton,
  },
})
export default class ProductItemView extends Vue {
  currentSlide = 0

  get currentProduct(): IProduct {
    return this.$store.state.products.currentProduct
  }
  checkImgLength(): boolean {
    return this.currentProduct.images.length > 1
  }
  addToCart(): void {
    this.$store.commit('cart/addProduct', this.currentProduct)
  }
  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.currentProduct.images.length) % this.currentProduct.images.length
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.currentProduct.images.length
  }
}
</script>

<style scoped lang="scss">
.product-item-view {
  &__description {
    max-width: 500px;
    margin: 0 auto;
    text-align: left;
    padding: 15px;
  }
  &__description:first-child {
    font-weight: bold;
  }
}
.img-slider {
  width: 720px;

  border-radius: 25px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__button {
    position: relative;
    bottom: 50%;
    transform: translateY(-50%);
  }
}
</style>
