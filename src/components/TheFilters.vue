<template>
  <div class="filters">
    <BaseSelect :areOptionsVisible="areOptionsVisible" />
    <div class="filters__price">
      <p>Price from:</p>
      <BaseInputRange
        :value="priceRange"
        :min="min"
        :max="max"
        :interval="1"
        :enableCross="false"
        @input="onPriceRangeChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BaseInputRange from './BaseComponents/BaseInputRange.vue'
import BaseSelect from './BaseComponents/BaseSelect.vue'

@Component({
  components: {
    BaseInputRange,
    BaseSelect,
  },
})
export default class TheFilters extends Vue {
  @Prop({ default: 0 }) min!: number
  @Prop({ default: 0 }) max!: number
  @Prop({ default: () => [] }) priceRange!: number[]
  areOptionsVisible = true

  onPriceRangeChange(value: []): void {
    this.$emit('input', value)
  }
}
</script>

<style scoped lang="scss">
.filters {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 48px;
}
</style>
