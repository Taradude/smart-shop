<template>
  <div @click="toggleOptions" class="select-menu">
    <p>{{ currentOption || defaultOptionsText }}</p>
    <div class="select-menu__options" v-if="areOptionsVisible">
      <p v-for="option in optionsList" :key="option" @click="onSelect(option)">{{ option }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component
export default class BaseSelect extends Vue {
  @Prop() areOptionsVisible!: boolean
  @Prop() optionsList!: string[]
  @Prop() currentOption!: string
  @Prop() defaultOptionsText!: string

  toggleOptions(): void {
    this.$emit('update:areOptionsVisible', !this.areOptionsVisible)
  }
  onSelect(option: string): void {
    this.$emit('update:currentOption', option)
  }
}
</script>

<style scoped lang="scss">
.select-menu {
  position: relative;
  border: 2px solid;
  padding: 12px;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &__options {
    position: absolute;
    top: 100%;
    display: flex;
    flex-direction: column;
    background-color: bisque;
    z-index: 100;
    border: 2px solid;
    padding: 8px;

    p {
      cursor: pointer;
      transition: all ease-in-out 0.2s;
      padding: 8px 0;
      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>
