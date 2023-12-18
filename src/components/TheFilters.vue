<template>
  <div class="filters">
    <div class="filters__select">
      <select name="" id="">
        <option value="Category" selected>Category</option>
      </select>
    </div>
    <div class="filters__price">
      <p>Price from:</p>
      <BaseInputRange
        :value="priceRange"
        :min="0"
        :max="2000"
        :interval="10"
        :enableCross="false"
        @input="onPriceRangeChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BaseInputRange from './BaseComponents/BaseInputRange.vue'

@Component({
  components: {
    BaseInputRange,
  },
})
export default class TheFilters extends Vue {
  @Prop({ default: [] }) priceRange!: []
  onPriceRangeChange(value: []): void {
    this.$emit('input', value)
  }
}
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 48px;

  &__select {
    flex-shrink: 0;
  }
  select {
    background-color: $blue;
    padding: 12px;
    color: $white;
    font-weight: bold;
    border-radius: 12px;
    option {
      border-radius: 12px;
    }
  }
}
</style>
