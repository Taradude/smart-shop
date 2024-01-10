<template>
  <div class="main-layout">
    <TheHeader :searchValue.sync="searchValue" />
    <div class="main-layout__page">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader.vue'
import { IProduct } from '@/interfaces/products'

@Component({
  components: {
    TheHeader,
  },
})
export default class MainLayout extends Vue {
  searchValue = ''

  @Watch('searchValue')
  onSearchValueChanged(newValue: string) {
    this.$store.dispatch('products/filterByKeyWords', newValue)
  }
  // GoToItem(product: IProduct) {
  //   this.$store.commit('products/setCurrentProduct', product)
  //   console.log('product')
  //   this.$router.push({
  //     name: 'ProductItemView',
  //     params: { name: product.title.replace(/\s/g, '-').toLowerCase() },
  //   })
  // }
}
</script>

<style lang="scss">
.main-layout {
  &__page {
    padding: 64px 48px;
    overflow-x: hidden;
  }
}
</style>
