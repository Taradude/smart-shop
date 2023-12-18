<template>
  <div class="base-input-range">
    <vue-slider
      :value="value"
      :min="min"
      :max="max"
      :interval="interval"
      :enableCross="enableCross"
      :minRange="350"
      @change="onChange"
    ></vue-slider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

type Value = number | string | Array<number | string>

@Component({
  components: {
    VueSlider,
  },
})
export default class BaseInputRange extends Vue {
  @Prop({ default: 0 }) value!: Value
  @Prop({ default: 0 }) min!: number
  @Prop({ default: 0 }) max!: number
  @Prop({ default: 0 }) interval!: number
  @Prop({ default: 0 }) enableCross!: boolean

  onChange(value: Value): void {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" scoped></style>
