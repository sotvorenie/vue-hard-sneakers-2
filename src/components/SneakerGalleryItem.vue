<script setup>
let props = defineProps({
  imageUrl: String,
  id: Number,
  slideActive: Number,
})
let emits = defineEmits(['updateSlide']);
</script>

<template>
  <li class="sneaker-info__gallery-item"
      :class="{'sneaker-info__gallery-item--active': slideActive === id}"
      @click="emits('updateSlide', id)"
  >
    <img :src="imageUrl" alt="Sneaker" loading="lazy">
  </li>
</template>