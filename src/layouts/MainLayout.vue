<template>
  <div class="main-layout">
    <HeaderView />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderView from '@/components/HeaderView.vue'

@Component({
  components: {
    HeaderView,
  },
})
export default class MainLayout extends Vue {}
</script>
