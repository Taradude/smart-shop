<template>
  <div @click="toggleOptions" class="select-menu">
    <p>Category</p>
    <div class="select-menu__options" v-if="areOptionsVisible">
      <p v-for="options in optionsList" :key="options">{{ options }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator'
export default class BaseSelect extends Vue {
  @Prop() areOptionsVisible!: boolean

  get optionsList(): string[] {
    return this.$store.state.products.categories
  }

  toggleOptions(): void {
    this.$emit('update:areOptionsVisible', !this.areOptionsVisible)
  }
}
</script>

<style scoped lang="scss">
.select-menu {
  border: 2px solid;
  padding: 12px;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &__options {
    border: 2px solid;
    padding: 5px;
  }
}
</style>
