<template>
  <div class="base-input">
    <label :for="id">{{ label }}</label>

    <input
      :class="{ error: isErrorShown }"
      :id="id"
      :name="id"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="onInput"
      @blur="onBlur"
    />

    <p v-if="isErrorShown" class="base-input__error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: '' }) id!: string
  @Prop({ default: '' }) errorMessage!: string
  @Prop({ default: '' }) isErrorShown!: boolean
  @Prop({ default: 'text' }) type!: string

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    this.$emit('input', target.value)
  }
  onBlur() {
    this.$emit('blur')
  }
}
</script>

<style scoped lang="scss">
.base-input {
  padding: 25px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 20px;
    font-weight: bold;
  }

  input {
    margin: 12px;
    width: 300px;
    background-color: $blue;
    color: $white;
    padding: 12px;
    line-height: 24px;
    border-radius: 8px;

    &::placeholder {
      color: $white;
      opacity: 0.8;
    }
  }

  .error {
    box-shadow: inset 0 0 0 2px red;
  }
}
</style>
