<template>
  <div class="main-layout">
    <TheHeader />
    <div class="main-layout__page">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader.vue'

@Component({
  components: {
    TheHeader,
  },
})
export default class MainLayout extends Vue {}
</script>

<style lang="scss">
.main-layout {
  &__page {
    padding: 64px 48px;
  }
}
@media screen and (max-width: 600px) {
  .main-layout__page {
    padding: 12px;
  }
}
</style>
