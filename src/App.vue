<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  unSubscribe!: () => void
  synchronizeStateAndStore() {
    this.unSubscribe = this.$store.subscribe((mutatation: any, state: any) => {
      localStorage.setItem('store', JSON.stringify(state))
    })
  }
  created() {
    this.$store.dispatch('products/getProducts')
    this.synchronizeStateAndStore()
  }

  destroyed() {
    this.unSubscribe()
  }
}
</script>

<style lang="scss">
#app {
  font-family: $font-family-default;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
}
</style>
