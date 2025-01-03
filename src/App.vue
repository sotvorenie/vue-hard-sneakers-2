<script setup>
import {onMounted} from "vue";

import Header from "@/components/Header.vue";
import st1 from "@/components/st1.vue";
import st2 from "@/components/st2.vue";
import st3 from "@/components/st3.vue";
import st4 from "@/components/st4.vue";
import st5 from "@/components/st5.vue";
import st6 from "@/components/st6.vue";
import st7 from "@/components/st7.vue";
import Footer from "@/components/Footer.vue";
import Cart from "@/components/Cart.vue";
import Order from "@/components/Order.vue";
import SneakerInfo from "@/components/SneakerInfo.vue";

import {useSneakersStore} from "@/store/sneakersStore.js";
import {useAbsoluteBlockStore} from "@/store/absoluteBlockStore.js";
import {useCartStore} from "@/store/cartStore.js";

import {closePhotoAnimation} from "@/composables/useViewPhotoAnimation.js";

const absoluteBlockStore = useAbsoluteBlockStore();
const sneakersStore = useSneakersStore();
const cartStore = useCartStore();

//переменная, в которой указывается количество изначально загружаемых кроссовок, равное 12
sneakersStore.sneakersNumber = 12;

onMounted(async () => {
  window.scrollTo(0, 0);

  await sneakersStore.getSneakers(sneakersStore.sneakersNumber);
  await cartStore.getCartItems();

  //проверка "есть ли интернет"
  //функция, чтобы выводитьанимацию загрузки фото
  const onImageLoadingAnimation = () => {
    let imageLoadingBlocks = document.querySelectorAll('.image-container');
    if (!navigator.onLine) {
      imageLoadingBlocks.forEach(block => {
        block.classList.add('image-container--active');
      })
    } else {
      imageLoadingBlocks.forEach(block => {
        block.classList.remove('image-container--active');
      })
    }
  }
  //функция, чтобы делать инпуты disabled, если нет интернета
  const onInputsDisabled = () => {
    let inputs = document.querySelectorAll('input');
    if (!navigator.onLine) {
      inputs.forEach(input => {
        input.disabled = true;
      })
    } else {
      inputs.forEach(input => {
        input.disabled = false;
      })
    }
  }
  onImageLoadingAnimation();
  onInputsDisabled();

  //если нет интернета, то периодически перезагружать траницу
  const online = navigator.onLine;
  if (!online) {
    setInterval(() => {
      location.reload();
    }, 15000);
  }
})
</script>

<template>
  <div class="absolute-block"
       v-show="absoluteBlockStore.absoluteBlockVisible"
       @click.self="absoluteBlockStore.closeCart(); closePhotoAnimation()"
  >
    <Cart v-if="absoluteBlockStore.cartBlockVisible"/>
    <Order v-if="absoluteBlockStore.orderBlockVisible"/>
    <SneakerInfo v-if="absoluteBlockStore.sneakerInfoBlockVisible"/>
    <div class="view-photo image-container" v-show="absoluteBlockStore.viewImageBlockVisible">
      <img :src="absoluteBlockStore.imageViewSrc" loading="lazy">
    </div>
  </div>
  <Header @openCart="absoluteBlockStore.openCart('cart')"/>
  <main class="content">
    <st1/>
    <st2/>
    <st3/>
    <st4/>
    <st5/>
    <st6/>
    <st7/>
  </main>
  <Footer/>
</template>