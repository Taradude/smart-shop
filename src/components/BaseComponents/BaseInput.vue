<template>
  <div class="base-input">
    <label for="">{{ label }}</label>
    <input type="text" :placeholder="placeholder" :value="value" @input="onInput" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) placeholder!: string

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    this.$emit('input', target.value)
  }
}
</script>

<style scoped lang="scss"></style>
