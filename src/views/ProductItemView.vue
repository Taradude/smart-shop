<template>
  <div class="product-item-view">
    <h3 class="product-item-view__title">Brand : {{ currentProduct.title }}</h3>
    <div class="img-slider">
      <BaseButton v-if="checkImgLength()" text="Prev" @click.native="prevSlide" />
      <carousel
        class="carousel"
        :per-page="1"
        :mouse-drag="true"
        :value="currentSlide"
        :loop="true"
        @page-change="onPageChange"
      >
        <slide v-for="img in currentProduct.images" :key="img">
          <div class="slide-content">
            <img :src="img" alt="Product image" />
          </div>
        </slide>
      </carousel>
      <BaseButton v-if="checkImgLength()" text="Next" @click.native="nextSlide" />
    </div>
    <p class="product-item-view__description">
      <strong>Description :</strong> {{ currentProduct.description }}
    </p>
    <p class="product-item-price"><strong>Price : </strong> ${{ currentProduct.price }}</p>
    <BaseButton class="product-item-view__button" text="Add to cart" @click.native="addToCart" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'
import { IProduct } from '@/interfaces/products'
import { Carousel, Slide } from 'vue-carousel'

@Component({
  components: {
    BaseButton,
    Carousel,
    Slide,
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
    if (this.currentSlide === 0) {
      this.currentSlide = this.currentProduct.images.length - 1
    } else {
      this.currentSlide--
    }
  }
  nextSlide(): void {
    if (this.currentSlide === this.currentProduct.images.length - 1) {
      this.currentSlide = 0
    } else {
      this.currentSlide++
    }
  }
  onPageChange(value: number): void {
    this.currentSlide = value
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
  &__button {
    transition: all 0.2s ease-in-out;
  }
  &__button:hover {
    background-color: $orange;
    color: $black;
  }
}
.img-slider {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.carousel {
  width: 100%;
  max-width: 600px;
}
.slide-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

img {
  max-width: 100%;
  max-height: 500px;
}
</style>
