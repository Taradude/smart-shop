<template>
  <button class="base-button">{{ text }}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ default: '' }) text!: string
}
</script>

<style scoped lang="scss">
.base-button {
  margin: 5px;
  padding: 12px;
  background-color: $orange;
  font-size: 16px;
  border-radius: 15px;
  font-weight: bold;
  color: $black;
}
</style>
