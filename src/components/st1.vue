<script setup>
import {onMounted, ref} from "vue";

import Filters from "@/components/Filters.vue";
import CatalogItem from "@/components/CatalogItem.vue";
import FiltersIcon from "@/components/icons/FiltersIcon.vue";

import {useSneakersStore} from "@/store/sneakersStore.js";
import {useAbsoluteBlockStore} from "@/store/absoluteBlockStore.js";
import {useCartStore} from "@/store/cartStore.js";
import {useFiltersStore} from "@/store/filtersStore.js";

const absoluteBlockStore = useAbsoluteBlockStore();
const sneakersStore = useSneakersStore();
const cartStore = useCartStore();
const filtersStore = useFiltersStore();

//переменная видимости блока фильтров
const filterBlockVisible = ref(true);

if (window.innerWidth < 769) {
  filterBlockVisible.value = false;
}

//переменная видимости загрузки кнопки "Показать еще"
const showBtnLoadingVisible = ref(false);
//функция при клике на кнопку "Показать еще"
const showBtnClick = async () => {
  try {
    showBtnLoadingVisible.value = true;
    if (sneakersStore.sneakersNumberInServer >= 12) {
      await sneakersStore.getSneakers(sneakersStore.sneakersNumber + 12);
    } else {
      await sneakersStore.getSneakers(sneakersStore.sneakersNumber + sneakersStore.sneakersNumberInServer, filtersStore.priceActive, filtersStore.sexActive, filtersStore.sizeActive);
    }
  } catch (err) {
    console.log(err);
  } finally {
    showBtnLoadingVisible.value = false;
  }
}

//функция при клике на кнопку "добавить корзину"
const putItemInCart = ref();
onMounted(() => {
  putItemInCart.value = (item) => {
    if (filtersStore.sizeActive) {
      cartStore.putInCartItem({
        ...item,
        activeSize: filtersStore.sizeActive
      });
    } else {
      let sizeBlock = document.querySelector('.filters-sizes');
      document.querySelector('.filters__item-error').classList.add('filters__item-error--active');
      sizeBlock.classList.add('filters-sizes--error');
      let rect = sizeBlock.getBoundingClientRect();

      if (window.innerWidth < 767) {
        filterBlockVisible.value = true;
        let middleOfElement = rect.top;
        window.scrollTo({
          top: middleOfElement + 500,
          behavior: 'smooth'
        });
      } else {
        let middleOfElement = rect.top + (rect.height / 2);
        let middleOfViewport = window.innerHeight / 2;
        window.scrollTo({
          top: middleOfElement - middleOfViewport + window.scrollY,
          behavior: 'smooth'
        });
      }
    }
  }
})
</script>

<template>
  <section class="st-1">
    <div class="st-1__inner container">
      <h2 class="section-title st-1__title h2">Каталог</h2>
      <button class="st-1__filters-btn visible-mobile" type="button" @click="filterBlockVisible = !filterBlockVisible">
        <FiltersIcon/>
      </button>
      <div class="st-1__content">
        <Filters :filters-block-visible="filterBlockVisible"/>
        <div class="st-1__right">
          <div class="st-1__catalog catalog">
            <div class="catalog__loading loading">Loading&#8230;</div>
            <ul class="catalog__list" v-auto-animate>
              <CatalogItem
                  v-for="item in sneakersStore.sneakers"
                  :title="item.title"
                  :price="item.price"
                  :sneaker="item"
                  :image-url="item.gallery[0].url"
                  @click-to-eye="absoluteBlockStore.openCart('info'); absoluteBlockStore.getSneakerInfo(item)"
                  @click-to-cart="putItemInCart(item)"
              />
            </ul>
          </div>
          <span class="catalog__error">Упс.. Проблемы с соединением :(</span>
          <button class="catalog-btn button"
                  v-if="sneakersStore.sneakersNumberInServer !== 0"
                  @click="showBtnClick"
          >
            <div class="catalog-btn__loading loading" v-if="showBtnLoadingVisible">Loading&#8230;</div>
            <span v-if="!showBtnLoadingVisible">Показать еще</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>