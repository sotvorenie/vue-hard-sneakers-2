<script setup>
import {computed, onMounted, ref} from "vue";

import {Swiper, SwiperSlide} from "swiper/vue";
import {EffectFade, Pagination, Autoplay} from "swiper/modules";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import SneakerGalleryItem from "@/components/SneakerGalleryItem.vue";
import Star from "@/components/icons/Star.vue";
import SneakerInfoSizeItem from "@/components/SneakerInfoSizeItem.vue";
import SneakerInfoListIcon from "@/components/icons/SneakerInfoListIcon.vue";

import {useAbsoluteBlockStore} from "@/store/absoluteBlockStore.js";
import {useSneakersStore} from "@/store/sneakersStore.js";
import {useCartStore} from "@/store/cartStore.js";
import {useFiltersStore} from "@/store/filtersStore.js";

const sneakersStore = useSneakersStore();
const absoluteBlockStore = useAbsoluteBlockStore();
const cartStore = useCartStore();
const filtersStore = useFiltersStore();

const props = defineProps({
  item: Object,
})

const itemSex = computed(() => {
  let [sex] = absoluteBlockStore.sneakerInfo.info.sex;
  return sex;
})

//переменная размера который мы выбрали
const sizeActive = ref();
//переменная индекса активного слайда
const slideActive = ref();

//функция при клике по выбранному размеру
const getActiveSizeClick = ref();
//функция при клике на кнопку "заказать"
const putInCartClick = ref();

//переменная для вкл/откл пролистывания слайдов
const sliderTouch = ref();
if (window.innerWidth > 767) {
  sliderTouch.value = false;
} else {
  sliderTouch.value = true;
}

//переменная видимости слайдера
const swiper = ref(null);
const swiperVisible = ref(false);

//отрисовываем количество звезд рейтинга продукта
const getRating = () => {
  absoluteBlockStore.sneakerRating = (absoluteBlockStore.sneakerInfo.rating.one + absoluteBlockStore.sneakerInfo.rating.two * 2 + absoluteBlockStore.sneakerInfo.rating.three * 3 + absoluteBlockStore.sneakerInfo.rating.fourth * 4 + absoluteBlockStore.sneakerInfo.rating.five * 5) / (absoluteBlockStore.sneakerInfo.rating.one + absoluteBlockStore.sneakerInfo.rating.two + absoluteBlockStore.sneakerInfo.rating.three + absoluteBlockStore.sneakerInfo.rating.fourth + absoluteBlockStore.sneakerInfo.rating.five);
}
const starsParent = ref(null);
const putStars = () => {
  let starsPath = starsParent.value.querySelectorAll('svg path');
  starsPath.forEach(star => {
    star.classList.remove('sneaker-info__star--active');
    star.style.fill = '';
  })
  for (let i = 0; i < Math.floor(absoluteBlockStore.sneakerRating); i++) {
    starsPath[i].style.fill = 'var(--color-accent)';
    starsPath[i].classList.add('sneaker-info__star--active');
  }
  for (let i = Math.floor(absoluteBlockStore.sneakerRating) + 1; i < 5; i++) {
    starsPath[i].style.fill = 'none';
  }
}

//функция при клике по звезде рейтинга
const starsMessage = ref(null);
const putSneakerRating = (starValue) => {
  let localStorageRatings = JSON.parse(localStorage.getItem('sneakersRating')) || [];
  let index = localStorageRatings.find(i => i.id === absoluteBlockStore.sneakerInfo.id);
  if (!index) {
    localStorageRatings.push({id: absoluteBlockStore.sneakerInfo.id, starValue});
    localStorage.setItem('sneakersRating', JSON.stringify(localStorageRatings));
    sneakersStore.putSneakerRating(absoluteBlockStore.sneakerInfo.id, starValue);
  } else {
    starsMessage.value.textContent = 'уже оценивали :)';
    starsMessage.value.style.color = 'red';
    starsMessage.value.classList.add('sneaker-info__stars-message--active');
    setTimeout(() => {
      starsMessage.value.classList.remove('sneaker-info__stars-message--active');
    }, 3000);
  }
}

onMounted(() => {
  //отрисовываем рейтинг и звезды
  getRating();
  putStars();

  //отрисовываем слайдер
  swiperVisible.value = true;
  setTimeout(() => {
    swiper.value.style.opacity = 1;
  }, 100);

  //при клике на кнопку "заказать"
  let sizeBlock = document.querySelector('.sneaker-info__size');
  putInCartClick.value = () => {
    if (sizeActive.value) {
      cartStore.putInCartItem({
        ...absoluteBlockStore.sneakerInfo,
        activeSize: sizeActive.value
      });
      absoluteBlockStore.closeCart();
    } else {
      sizeBlock.classList.add('sneaker-info__size--active-error');
    }
  }
  getActiveSizeClick.value = (size) => {
    sizeActive.value = size;
    sizeBlock.classList.remove('sneaker-info__size--active-error');
  }
})

const swiperSlider = ref(null);

//переменная для правильного переключения слайдов после второго круга бесконечного слайдера
const sliderRound = ref(1);
</script>
<template>
  <div class="sneaker-info">
    <button class="sneaker-info__close visible-mobile" type="button" @click="absoluteBlockStore.closeCart()"></button>
    <div class="sneaker-info__content">
      <div class="sneaker-info__top">
        <div class="sneaker-info__gallery" ref="swiper">
          <Swiper class="sneaker-info__view-container image-container"
                  @init="swiperSlider = $event"
                  v-if="swiperVisible"
                  :modules="[EffectFade, Pagination, Autoplay]"
                  :effect="'fade'"
                  :loop="true"
                  :speed="500"
                  :fade-effect="{crossFade: false}"
                  @slide-change="
                    slideActive = $event.realIndex + 1;
                    $event.realIndex === 0 && $event.activeIndex === 4 ? sliderRound = 2 : ''"
                  :pagination= "{
                    el: '.sneaker-info__pagination',
                  }"
                  :allow-touch-move="sliderTouch"
                  :autoplay="{
                    delay: 2500,
                  }"
                  @touch-move="$event.autoplay.stop()"
          >
            <SwiperSlide class="image-container">
              <img :src="absoluteBlockStore.sneakerInfo.gallery[0].url" loading="lazy"/>
            </SwiperSlide>
            <SwiperSlide class="image-container">
              <img :src="absoluteBlockStore.sneakerInfo.gallery[1].url" loading="lazy"/>
            </SwiperSlide>
            <SwiperSlide class="image-container">
              <img :src="absoluteBlockStore.sneakerInfo.gallery[2].url" loading="lazy"/>
            </SwiperSlide>
            <SwiperSlide class="image-container">
              <img :src="absoluteBlockStore.sneakerInfo.gallery[3].url" loading="lazy"/>
            </SwiperSlide>
            <SwiperSlide class="image-container">
              <img :src="absoluteBlockStore.sneakerInfo.gallery[4].url" loading="lazy"/>
            </SwiperSlide>
          </Swiper>
          <div class="sneaker-info__pagination" slot="pagination" v-if="sliderTouch"></div>
          <ul class="sneaker-info__gallery-list hidden-mobile">
            <SneakerGalleryItem
                v-for="sneaker in absoluteBlockStore.sneakerInfo.gallery"
                :key="+sneaker.id"
                :id="+sneaker.id"
                :image-url="sneaker.url"
                :slideActive="slideActive"
                @update-slide="
                  swiperSlider.slideTo($event - sliderRound);
                  swiperSlider.autoplay.stop()"
            />
          </ul>
        </div>
        <div class="sneaker-info__info">
          <div>
            <div class="sneaker-info__line">
              <div class="sneaker-info__count">
                <span class="sneaker-info__span">Артикул:</span>
                <span class="sneaker-info__span">{{absoluteBlockStore.sneakerInfo.articul}}</span>
              </div>
              <div class="sneaker-info__count">
                <span class="sneaker-info__span">В наличии:</span>
                <p>{{absoluteBlockStore.sneakerInfo.number}} шт</p>
              </div>
            </div>
            <h3 class="sneaker-info__title h3">{{absoluteBlockStore.sneakerInfo.title}}</h3>
            <div class="sneaker-info__stars" ref="starsParent">
              <button type="button" @click="putSneakerRating(1)"><Star/></button>
              <button type="button" @click="putSneakerRating(2)"><Star/></button>
              <button type="button" @click="putSneakerRating(3)"><Star/></button>
              <button type="button" @click="putSneakerRating(4)"><Star/></button>
              <button type="button" @click="putSneakerRating(5)"><Star/></button>
              <div class="sneaker-info__stars-rating">{{absoluteBlockStore.sneakerRating.toFixed(2)}}</div>
              <div class="sneaker-info__stars-message" ref="starsMessage">спасибо за отзыв!!</div>
            </div>
            <div class="sneaker-info__size">
              <p>Выберите размер</p>
              <ul class="sneaker-info__size-list">
                <SneakerInfoSizeItem
                    v-for="size in absoluteBlockStore.sneakerInfo.sizes"
                    :key="size.id"
                    :size="size.size"
                    :inStock="size.inStock"
                    :sizeActive="sizeActive"
                    @update-size="getActiveSizeClick(size.size)"
                />
              </ul>
              <span class="sneaker-info__size-error">необходимо выбрать размер!!</span>
            </div>
            <div class="sneaker-info__price">
              <h2 class="h2">{{absoluteBlockStore.sneakerInfo.price.toLocaleString()}}</h2>
              <p>{{absoluteBlockStore.sneakerInfo.oldPrice.toLocaleString()}}</p>
            </div>
          </div>
          <div>
            <button class="sneaker-info__btn button"
                    @click="putInCartClick"
            >Заказать</button>
            <ul class="sneaker-info__pluses">
              <li><SneakerInfoListIcon/>Бесплатная доставка до двери</li>
              <li><SneakerInfoListIcon/>Оплата заказа при получении</li>
              <li><SneakerInfoListIcon/>Обмен в течение двух недель</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sneaker-info__bottom">
        <div class="sneaker-info__about">
          <h3 class="h3">Описание</h3>
          <p>{{absoluteBlockStore.sneakerInfo.about}}</p>
        </div>
        <div>
          <div class="sneaker-info__characters">
            <h3 class="h3">Характеристики</h3>
            <ul>
              <li>
                <p>Пол:</p>
                <p>{{itemSex}}</p>
              </li>
              <li>
                <p>Цвета:</p>
                <p>{{ absoluteBlockStore.sneakerInfo.info.colors }}</p>
              </li>
              <li>
                <p>Состав:</p>
                <p>{{ absoluteBlockStore.sneakerInfo.info.material }}</p>
              </li>
              <li>
                <p>Страна:</p>
                <p>{{ absoluteBlockStore.sneakerInfo.info.country }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="sneaker-info__footer"></div>-->
  </div>
</template>