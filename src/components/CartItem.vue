<script setup>
import DeleteCartItem from "@/components/icons/deleteCartItem.vue";

const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number
})

const emits = defineEmits(['deleteFromCart']);
</script>

<template>
  <li class="cart__item absolute-block__item">
    <div class="cart__item-content absolute-block__item-content">
      <div class="cart__item-container absolute-block__item-container image-container">
        <img :src="imageUrl" loading="lazy"/>
      </div>
      <div class="cart__item-info absolute-block__item-info">
        <p>{{title}}</p>
        <span>{{price.toLocaleString()}} ₽ </span>
      </div>
    </div>
    <button class="cart__item-delete-btn absolute-block__item-delete-btn" type="button" @click="emits('deleteFromCart')"><delete-cart-item/></button>
  </li>
</template>