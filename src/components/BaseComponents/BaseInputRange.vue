<template>
  <div>
    <input type="range" />
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
input[type='range'] {
  -webkit-appearance: none;
  width: 100px;
  height: 10px; /* Висота полоски */

  /* Задайте стилі для заповненої частини полоски (зафарбованої) */
  background-color: $blue;
  border-radius: 5px; /* Закруглені кути полоски */
  outline: none; /* Забороняє відображення контуру фокусу */
}

/* Стилізація кружочка (псевдоелемента thumb) */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /* Відключає стандартний стиль для WebKit */
  width: 20px; /* Ширина кружочка */
  height: 20px; /* Висота кружочка */
  background-color: $grey; /* Колір кружочка */
  border: 2px solid #ddd; /* Обводка кружочка */
  border-radius: 50%; /* Кругла форма кружочка */
  cursor: pointer; /* Змінює вигляд курсора при наведенні на кружочок */
  margin-top: -5px; /* Вирівнює кружочок по вертикалі */
}
</style>
