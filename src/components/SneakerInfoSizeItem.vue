<script setup>
let props = defineProps({
  size: Number,
  inStock: Boolean,
  sizeActive: Number,
})
let emits = defineEmits(['updateSize']);

//функция при клике на блок size
const clickToSize = () => {
  if (props.inStock) {
    emits('updateSize', props.size);
  }
}
</script>

<template>
  <li class="sneaker-info__size-item"
      :class="{
        'sneaker-info__size-item--active': sizeActive === size,
        'sneaker-info__size-item--disabled': inStock === false,
      }"
      @click="clickToSize"
  >
    <div class="sneaker-info__size-item-modal">
      <p>Размера нет в наличии</p>
      <div></div>
    </div>
    <p>{{size}}</p>
  </li>
</template>