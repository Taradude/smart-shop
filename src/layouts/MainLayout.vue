<template>
  <div class="main-layout">
    <TheHeader />
    <div class="main-layout__page">
      <div class="main-layout__page-wrap">
        <router-view />
      </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-wrap {
      max-width: 1140px;
      width: 100%;
    }
  }
}
@media screen and (max-width: 767px) {
  .main-layout__page {
    padding: 12px;
  }
}
</style>
