<template>
  <div @click="toggleOptions" class="select-menu">
    <span :class="{ rotated: areOptionsVisible }">{{ currentOption || defaultOptionsText }}</span>
    <div class="select-menu__options" v-if="areOptionsVisible">
      <p @click="clearOptions"><b>Clear Options</b></p>
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
  clearOptions(): void {
    this.$emit('click')
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

  &:hover {
    cursor: pointer;
  }

  span {
    font-size: 20px;
    transition: transform 0.2s ease-in-out;

    &::after {
      content: ' ➜';
    }
  }
  .rotated {
    transform: rotate(10deg);
  }

  &__options {
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    background-color: $white;
    opacity: 0.9;
    z-index: 100;
    border: 2px solid;
    padding: 8px;
    border-radius: 12px;

    p {
      cursor: pointer;
      transition: all ease-in-out 0.2s;
      padding: 8px 4px;
      border-radius: 12px;

      &:hover {
        background-color: $blue;
        color: $white;
      }
    }
  }
}
</style>
