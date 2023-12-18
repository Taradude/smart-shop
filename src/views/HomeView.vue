<template>
  <div class="home-view">
    <carousel>
      <slide v-for="img in productsList[currentSlide].images" :key="img" :autoplay="5000" :per-page="1">
        <img :src="img" alt="" />
      </slide>
    </carousel>
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
  get productsList(): any {
    return this.$store.state.products.productsList.slice(0, 10)
  }
}
</script>
