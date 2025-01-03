<script setup>
import {reactive, onMounted} from "vue";

import {useScrollToElement} from "@/composables/useScrollToElement.js";

//все элементы, к которым будем делать скролл
var elementForScroll = reactive({});

onMounted(() => {
  elementForScroll = {
    catalog: document.querySelector('.st-1'),
    aboutUs: document.querySelector('.st-2'),
    itemsForYou: document.querySelector('.st-3'),
    ourTeam: document.querySelector('.st-4'),
    orderAndPrice: document.querySelector('.st-5'),
    contacts: document.querySelector('.st-6'),
  }
})
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <nav class="footer__nav">
        <a href="" class="footer__logo logo"><h2 class="h2">SneakMax</h2></a>
        <ul class="footer__list">
          <li class="footer__item">
            <a href="" class="footer__link" @click.prevent="useScrollToElement(elementForScroll.catalog, 0)">Каталог</a>
          </li>
          <li class="footer__item">
            <a href="" class="footer__link" @click.prevent="useScrollToElement(elementForScroll.aboutUs)">О нас</a>
          </li>
          <li class="footer__item">
            <a href="" class="footer__link" @click.prevent="useScrollToElement(elementForScroll.itemsForYou)">Подбор товара</a>
          </li>
          <li class="footer__item">
            <a href="" class="footer__link" @click.prevent="useScrollToElement(elementForScroll.ourTeam, 0)">Наша команда</a>
          </li>
          <li class="footer__item">
            <a href="" class="footer__link" @click.prevent="useScrollToElement(elementForScroll.orderAndPrice)">Доставка и оплата</a>
          </li>
          <li class="footer__item">
            <a href="" class="footer__link" @click.prevent="useScrollToElement(elementForScroll.contacts)">Контакты</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>