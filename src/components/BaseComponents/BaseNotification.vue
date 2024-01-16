<template>
  <div v-if="isShown" :class="['base-notification', { 'base-notification--error': isError }]">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseNotification extends Vue {
  @Prop({ default: '' }) text!: string
  @Prop({ default: false }) isError!: boolean
  @Prop({ default: false }) isShown!: boolean
  timeOut: undefined | number = undefined

  closeNotification() {
    this.$emit('update:isShown', false)
  }
  created() {
    this.timeOut = setTimeout(this.closeNotification, 3000)
  }
  destroyed() {
    clearTimeout(this.timeOut)
  }
  resetTimeout() {
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(this.closeNotification, 3000)
  }
}
</script>

<style scoped lang="scss">
.base-notification {
  width: 300px;
  padding: 16px;
  background-color: $green;
  border-radius: 16px;
  color: $white;
  position: absolute;
  right: 0;
  top: 0;
  margin: 16px;

  &--error {
    background-color: $red;
  }
}
</style>
