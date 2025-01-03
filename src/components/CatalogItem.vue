<script setup>
import {onMounted, ref} from "vue";

import CatalogEye from "@/components/icons/CatalogEye.vue";
import CatalogCart from "@/components/icons/CatalogCart.vue";

let props = defineProps({
  title: String,
  price: Number,
  imageUrl: String,
})

let emits = defineEmits(['clickToEye', 'clickToCart']);

//функция при клике по карточке (чтобы открыть/закрыть список кнопок "просмотреть" и "добавить в корзину")
const catalogItemClick = ref();
onMounted(() => {
  catalogItemClick.value = (event) => {
    let absoluteBlock = document.querySelectorAll('.catalog__absolute');
    let activeBlock;

    function removeAllActiveBlocks() {
      absoluteBlock.forEach(i => {
        if (i.classList.contains('catalog__absolute--active')) {
          activeBlock = i.closest('.catalog__item');
        }
        i.classList.remove('catalog__absolute--active');
      })
    }

    removeAllActiveBlocks();
    if (activeBlock !== event.target.closest('.catalog__item')) {
      let parent = event.target.closest('.catalog__item');
      parent.querySelector('.catalog__absolute').classList.add('catalog__absolute--active');
    }
  }
})
</script>

<template>
  <li class="catalog__item" @click="catalogItemClick($event)">
    <div class="catalog__container image-container">
      <div class="catalog__absolute">
        <div class="catalog__absolute-item" @click="emits('clickToEye')"><CatalogEye/></div>
        <div class="catalog__absolute-item" @click="emits('clickToCart')"><CatalogCart/></div>
      </div>
      <img :src="imageUrl" :alt="title" loading="lazy">
    </div>
    <div class="catalog__text">
      <p class="catalog-title">{{title}}</p>
      <p class="catalog-price">{{price.toLocaleString()}} р</p>
    </div>
  </li>
</template>