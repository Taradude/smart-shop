<template>
  <button :disabled="isDisabled" class="base-button">{{ text }}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ default: '' }) text!: string
  @Prop({ default: false }) isDisabled!: boolean
}
</script>

<style scoped lang="scss">
.base-button {
  margin: 5px;
  padding: 12px;
  background-color: $blue;
  font-size: 16px;
  border-radius: 15px;
  font-weight: bold;
  color: $white;
}
</style>
