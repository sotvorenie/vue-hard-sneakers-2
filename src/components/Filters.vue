<script setup>
import {onMounted, ref} from "vue";

import FiltersSearch from "@/components/icons/FiltersSearch.vue";
import ParamsSize from "@/components/ParamsSize.vue";

import {useSneakersStore} from "@/store/sneakersStore.js";
import {useFiltersStore} from "@/store/filtersStore.js";

const sneakersStore = useSneakersStore();
const filtersStore = useFiltersStore();

const props = defineProps({
  filtersBlockVisible: Boolean,
})

let sizes = ref([35, 36, 37, 38, 39, 40, 41, 42, 43]);

//функция при клике на выбор размера
const sizeActiveClick = ref();
onMounted(() => {
  sizeActiveClick.value = (size) => {
    document.querySelector('.filters__item-error').classList.remove('filters__item-error--active');
    document.querySelector('.filters-sizes').classList.remove('filters-sizes--error');
    if (filtersStore.sizeActive === size) {
      filtersStore.sizeActive = '';
    } else {
      filtersStore.sizeActive = size;
    }
  }
})

//функция при клике на кнопку "Применить фильтрацию"
const sortBtnClick = () => {
  sneakersStore.getSneakers(12, filtersStore.priceActive, filtersStore.sexActive, filtersStore.sizeActive);
}
//функция при клике на кнопку "Сбросить фильтрацию"
const resetFiltrationBtn = () => {
  filtersStore.priceActive = {
    min: 0,
    max: 999999,
  };
  filtersStore.sexActive = {
    men: true,
    women: true,
  };
  filtersStore.sizeActive = '';
  sneakersStore.getSneakers(12, filtersStore.priceActive, filtersStore.sexActive, filtersStore.sizeActive);
}
</script>

<template>
  <div class="st-1__filters filters" v-show="filtersBlockVisible">
    <h3 class="filters-title h3">Подбор<br> по параметрам</h3>
    <div class="filters__item">
      <p>Цена, руб</p>
      <div class="filters-prices">
        <input class="filters-price filters-min" maxlength="6"
               v-model="filtersStore.priceActive.min"
               @input="filtersStore.priceActive.min = $event.target.value.replace(/\D/g, '')">
        <input class="filters-price filters-max" maxlength="6"
               v-model="filtersStore.priceActive.max"
               @input="filtersStore.priceActive.max = $event.target.value.replace(/\D/g, '')">
      </div>
    </div>
    <div class="filters__item">
      <p>Пол</p>
      <form class="filters-sex">
        <label class="filters-sex__item checkbox">
          <input type="checkbox" value="men" v-model="filtersStore.sexActive.men">
          <div><FiltersSearch/></div>
          <p>мужской</p>
        </label>
        <label class="filters-sex__item checkbox">
          <input type="checkbox" value="women" v-model="filtersStore.sexActive.women">
          <div><FiltersSearch/></div>
          <p>женский</p>
        </label>
      </form>
    </div>
    <div class="filters__item">
      <p>Размер</p>
      <div class="filters-sizes">
        <ParamsSize
            v-for="size in sizes"
            :size="size"
            :sizeActive="filtersStore.sizeActive"
            @click="sizeActiveClick(size)"
        />
      </div>
      <span class="filters__item-error">выберите размер..</span>
    </div>
    <button class="filters__btn button button--dark" type="button" @click="sortBtnClick">Применить</button>
    <button class="filters__btn filters-reset" @click="resetFiltrationBtn">сбросить</button>
  </div>
</template>