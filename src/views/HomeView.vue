<template>
  <div class="home-view">
    <h1>Online Shop</h1>
    <div class="img-slider">
      <carousel class="carousel" autoplay :per-page="1" loop>
        <slide class="img-slider__slide" v-for="product in firstProducts" :key="product.id">
          <img :src="product.images[0]" alt="" />
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Carousel, Slide } from 'vue-carousel'

@Component({
  components: {
    Carousel,
    Slide,
  },
})
export default class HomeView extends Vue {
  currentSlide = 0

  get firstProducts(): any {
    return this.$store.state.products.productsList.slice(0, 7).map((product: any) => ({
      id: product.id,
      images: [product.images[0]],
    }))
  }
}
</script>

<style scoped lang="scss">
.img-slider {
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;

  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
}
.carousel {
  width: 100%;
  max-width: 600px;
}

img {
  max-width: 100%;
  max-height: 500px;
}
</style>
