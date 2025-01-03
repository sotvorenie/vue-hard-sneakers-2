<script setup>
import {onMounted, reactive, ref} from "vue";

import BurgerMenu from "@/components/icons/BurgerMenu.vue";
import Cart from "@/components/icons/Cart.vue";

import {useScrollToElement} from "@/composables/useScrollToElement.js";

import {useCartStore} from "@/store/cartStore.js";

const cartStore = useCartStore();

//переменная для видимости бургер-меню на мобилках
const burgerMenuVisible = ref();

//все элементы, к которым будем делать скролл
var elementForScroll = reactive({});

//функция при клике на иконку бургер-меню
const openBurgerMenu = ref();

onMounted(() => {
  elementForScroll = {
    catalog: document.querySelector('.st-1'),
    aboutUs: document.querySelector('.st-2'),
    itemsForYou: document.querySelector('.st-3'),
    ourTeam: document.querySelector('.st-4'),
    orderAndPrice: document.querySelector('.st-5'),
    contacts: document.querySelector('.st-6'),
  }

  if (window.innerWidth < 767) {
    burgerMenuVisible.value = false;
  } else {
    burgerMenuVisible.value = true;
  }

  openBurgerMenu.value = () => {
    burgerMenuVisible.value = !burgerMenuVisible.value;
    document.body.classList.toggle('body-overflow-hidden');
    if (burgerMenuVisible.value) {
      document.querySelector('.st-1').classList.add('st-1--z-index');
    } else {
      document.querySelector('.st-1').classList.remove('st-1--z-index');
    }
  }
})

const emits = defineEmits(['openCart'])
</script>

<template>
  <header class="header">
    <p class="header__bg-text hidden-mobile">SneakMax</p>
    <div class="header__inner container">
      <div class="header__line">
        <a href="" class="header__logo logo"><h2 class="h2">SneakMax</h2></a>
        <nav class="header__links header-menu">
          <ul class="header-menu__list hidden-mobile">
            <li class="header-menu__item">
              <a href="" class="header-menu__link"
                 @click.prevent="useScrollToElement(elementForScroll.catalog, 0)"
              >Каталог</a>
            </li>
            <li class="header-menu__item">
              <a href="" class="header-menu__link"
                 @click.prevent="useScrollToElement(elementForScroll.aboutUs)"
              >О нас</a>
            </li>
            <li class="header-menu__item">
              <a href="" class="header-menu__link"
                 @click.prevent="useScrollToElement(elementForScroll.itemsForYou)"
              >Подбор товаров</a>
            </li>
            <li class="header-menu__item">
              <a href="" class="header-menu__link"
                 @click.prevent="useScrollToElement(elementForScroll.ourTeam, 0)"
              >Наша команда</a>
            </li>
            <li class="header-menu__item">
              <a href="" class="header-menu__link"
                 @click.prevent="useScrollToElement(elementForScroll.orderAndPrice)"
              >Доставка и оплата</a>
            </li>
            <li class="header-menu__item">
              <a href="" class="header-menu__link"
                 @click.prevent="useScrollToElement(elementForScroll.contacts)"
              >Контакты</a>
            </li>
          </ul>
          <div class="header-menu__cart" @click="emits('openCart')">
            <p>Корзина</p>
            <div>
              <Cart/>
              <span v-if="cartStore.cart.length !== 0">{{cartStore.cart.length}}</span>
            </div>
          </div>
          <button
              class="header__burger-icon visible-mobile"
              type="button"
              @click="openBurgerMenu"
          >
            <BurgerMenu :class="{'is-hidden': burgerMenuVisible}"/>
            <div v-if="burgerMenuVisible">
              <span></span>
              <span></span>
            </div>
          </button>
          <div class="header-menu__mobile visible-mobile" v-if="burgerMenuVisible">
            <ul class="header-menu__list visible-mobile">
              <li class="header-menu__item">
                <a href="" class="header-menu__link"
                   @click.prevent="openBurgerMenu(); useScrollToElement(elementForScroll.catalog, 0)"
                >Каталог</a>
              </li>
              <li class="header-menu__item">
                <a href="" class="header-menu__link"
                   @click.prevent="openBurgerMenu(); useScrollToElement(elementForScroll.aboutUs)"
                >О нас</a>
              </li>
              <li class="header-menu__item">
                <a href="" class="header-menu__link"
                   @click.prevent="openBurgerMenu(); useScrollToElement(elementForScroll.itemsForYou)"
                >Подбор товаров</a>
              </li>
              <li class="header-menu__item">
                <a href="" class="header-menu__link"
                   @click.prevent="openBurgerMenu(); useScrollToElement(elementForScroll.ourTeam, 0)"
                >Наша команда</a>
              </li>
              <li class="header-menu__item">
                <a href="" class="header-menu__link"
                   @click.prevent="openBurgerMenu(); useScrollToElement(elementForScroll.orderAndPrice)"
                >Доставка и оплата</a>
              </li>
              <li class="header-menu__item">
                <a href="" class="header-menu__link"
                   @click.prevent="openBurgerMenu(); useScrollToElement(elementForScroll.contacts)"
                >Контакты</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="header__info">
        <h1 class="header__title h1">Кроссовки известных брендов с доставкой по России и СНГ</h1>
        <p class="header__text">Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и многие другие по низким ценам</p>
        <button class="header__btn button" type="button" @click.prevent="useScrollToElement(elementForScroll.catalog, 0)">Перейти к покупкам</button>
      </div>
    </div>
  </header>
</template>