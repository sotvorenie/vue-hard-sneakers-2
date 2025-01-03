<script setup>
const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number,
})

const emits = defineEmits(['deleteFromCart']);
</script>

<template>
  <li class="order__accordion-item order__item absolute-block__item">
    <div class="order__item-content absolute-block__item-content">
      <div class="order__item-container absolute-block__item-container image-container">
        <img :src="imageUrl" loading="lazy"/>
      </div>
      <div class="order__item-info absolute-block__item-info">
        <p>{{title}}</p>
        <span>{{price.toLocaleString()}} ₽ </span>
      </div>
    </div>
    <button class="order__item-delete-btn absolute-block__item-delete-btn" type="button" @click="emits('deleteFromCart')">Удалить</button>
  </li>
</template>