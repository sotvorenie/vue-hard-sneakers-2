<script setup>
defineProps({
  size: Number,
  sizeActive: Number,
})
</script>

<template>
  <div class="filters-sizes__size" :class="{'filters-sizes__size--active': size === sizeActive}"><p>{{size}}</p></div>
</template>