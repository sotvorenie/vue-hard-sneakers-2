<script setup>
import {onMounted, reactive, ref} from "vue";

import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';

import FiltersSearch from "@/components/icons/FiltersSearch.vue";

import {onSubmit} from "@/composables/useFormValidate.js";
import {onBlur} from "@/composables/useFormValidate.js";

import {useSneakersStore} from "@/store/sneakersStore.js";

const sneakersStore = useSneakersStore();

//переменная видимости блока слайдеров
const slidersVisible = ref(true);

//переменная активного слайда
const activeSlide = ref(1);

const swiper = ref(null);

//функция при клике по слайдеру
const toNextSlideClick = ref();

//переменные для данных слайдера
//переменная текста ошибки под слайдером
const sneakerSliderErrorText = ref('');
//названия типов кроссовок
const sneakersTypesNames = ['кеды', 'повседневные', 'трекинговые', 'горные', 'дизайнерские', 'беговые'];
//список всех возможных размеров кроссовок
const sneakersAllSizes = ['менее 36', '36-38', '39-41', '42-44', '45 и более'];
//список типов кроссовок (слайд 1)
var sneakersTypes = reactive({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false
})
//список размеров кроссовок (слайд 2)
var sneakersSizes = reactive({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false
})
//текст комментария (слайд 3)
const commentText = ref('');
//имя пользователя (2 слайдер)
const userName = ref('');
//email пользователя (2 слайдер)
const userEmail = ref('');

//функция добавления типа кроссовок на 1 слайде
const addSneakerType = (id) => {
  sneakersTypes[id] = !sneakersTypes[id];
  sneakerSliderErrorText.value = '';
}
//функция добавления размера кроссовок на 2 слайде
const addSneakerSize = (id) => {
  sneakersSizes[id] = !sneakersSizes[id];
  sneakerSliderErrorText.value = '';
}

//функция валидации для каждого слайда (возвращает "валиден слайд" или "не валиден")
const slideValidate = (obj) => {
  let array = [];
  for (let i in obj) {
    array.push(obj[i]);
  }
 return array.find(i => i);
}

onMounted(() => {
  toNextSlideClick.value = () => {
    if (activeSlide.value === 1) {
      let firstSlideValidate = slideValidate(sneakersTypes);
      if (!firstSlideValidate) {
        sneakerSliderErrorText.value = 'выберите хотя бы один тип';
      } else {
        swiper.value.slideNext();
        activeSlide.value = 2;
      }
    } else if (activeSlide.value === 2) {
      let secondSlideValidate = slideValidate(sneakersSizes);
      if (!secondSlideValidate) {
        sneakerSliderErrorText.value = 'выберите необходимый размер';
      } else {
        swiper.value.slideNext();
        activeSlide.value = 3;
      }
    } else if (activeSlide.value === 3) {
        slidersVisible.value = false;
    }
  }
})

//функция для отправки письма на email при удачной валидации формы
const sendToEmail = () => {
  function getArray(obj, objNames) {
    let array = [];
    for (let i in obj) {
      array.push([obj[i], i - 1]);
    }
    let answer = [];
    array.forEach(i => {
      if (i[0] === true) {
        answer.push(objNames[i[1]]);
      }
    });
    return answer;
  }

  let types = getArray(sneakersTypes, sneakersTypesNames);
  let sizes = getArray(sneakersSizes, sneakersAllSizes);

  sneakersStore.sendRecommendSneakers(types, sizes, commentText.value, userName.value, userEmail.value);
}
</script>

<template>
  <section class="st-3">
    <div class="st-3__inner container">
      <div class="st-3__first" v-show="slidersVisible">
        <h2 class="st-3__title h2">Мы подберем идеальную пару для вас</h2>
        <p class="st-3__text">Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями </p>
        <Swiper class="st-3__swiper"
                @init="swiper = $event"
                :allow-touch-move="false"
        >
          <SwiperSlide class="st-slide">
            <h3 class="st-slide__title h3">Какой тип кроссовок рассматриваете?</h3>
            <ul class="st-slide__list">
              <li class="st-slide__item">
                <div class="st-slide__item-container image-container">
                  <img src="../../public/images/firstSlidePhoto.jpg" loading="lazy"/>
                </div>
                <label class="st-slide__checkbox checkbox">
                  <input type="checkbox" @change="addSneakerType(1)">
                  <div><FiltersSearch/></div>
                  <p>кеды</p>
                </label>
              </li>
              <li class="st-slide__item">
                <div class="st-slide__item-container image-container">
                  <img src="../../public/images/firstSlidePhoto.jpg" loading="lazy"/>
                </div>
                <label class="st-slide__checkbox checkbox">
                  <input type="checkbox" @change="addSneakerType(2)">
                  <div><FiltersSearch/></div>
                  <p>повседневные</p>
                </label>
              </li>
              <li class="st-slide__item">
                <div class="st-slide__item-container image-container">
                  <img src="../../public/images/firstSlidePhoto.jpg" loading="lazy"/>
                </div>
                <label class="st-slide__checkbox checkbox">
                  <input type="checkbox" @change="addSneakerType(3)">
                  <div><FiltersSearch/></div>
                  <p>трекинговые</p>
                </label>
              </li>
              <li class="st-slide__item">
                <div class="st-slide__item-container image-container">
                  <img src="../../public/images/firstSlidePhoto.jpg" loading="lazy"/>
                </div>
                <label class="st-slide__checkbox checkbox">
                  <input type="checkbox" @change="addSneakerType(4)">
                  <div><FiltersSearch/></div>
                  <p>горные</p>
                </label>
              </li>
              <li class="st-slide__item">
                <div class="st-slide__item-container image-container">
                  <img src="../../public/images/firstSlidePhoto.jpg" loading="lazy"/>
                </div>
                <label class="st-slide__checkbox checkbox">
                  <input type="checkbox" @change="addSneakerType(5)">
                  <div><FiltersSearch/></div>
                  <p>дизайнерские</p>
                </label>
              </li>
              <li class="st-slide__item">
                <div class="st-slide__item-container image-container">
                  <img src="../../public/images/firstSlidePhoto.jpg" loading="lazy"/>
                </div>
                <label class="st-slide__checkbox checkbox">
                  <input type="checkbox" @change="addSneakerType(6)">
                  <div><FiltersSearch/></div>
                  <p>беговые</p>
                </label>
              </li>
            </ul>
          </SwiperSlide>
          <SwiperSlide class="st-slide">
            <h3 class="st-slide__title h3">Какой размер вам подойдет?</h3>
            <div class="st-slide__checkbox-size">
              <label class="st-slide__checkbox checkbox">
                <input type="checkbox" @change="addSneakerSize(1)">
                <div><FiltersSearch/></div>
                <p>менее 36</p>
              </label>
              <label class="st-slide__checkbox checkbox">
                <input type="checkbox" @change="addSneakerSize(2)">
                <div><FiltersSearch/></div>
                <p>36-38</p>
              </label>
              <label class="st-slide__checkbox checkbox">
                <input type="checkbox" @change="addSneakerSize(3)">
                <div><FiltersSearch/></div>
                <p>39-41</p>
              </label>
              <label class="st-slide__checkbox checkbox">
                <input type="checkbox" @change="addSneakerSize(4)">
                <div><FiltersSearch/></div>
                <p>42-44</p>
              </label>
              <label class="st-slide__checkbox checkbox">
                <input type="checkbox" @change="addSneakerSize(5)">
                <div><FiltersSearch/></div>
                <p>45 и больше</p>
              </label>
            </div>
            <div class="st-slide__item-container st-slide__second-container image-container">
              <img src="../../public/images/secondSlidePhoto.jpg" loading="lazy"/>
            </div>
          </SwiperSlide>
          <SwiperSlide class="st-slide">
            <h3 class="st-slide__title h3">Уточните какие-либо моменты</h3>
            <textarea class="st-slide__textarea" placeholder="Введите сообщение" v-model="commentText"></textarea>
          </SwiperSlide>
        </Swiper>
        <div class="st-3__footer">
          <span class="st-3__footer--error">{{sneakerSliderErrorText}}</span>
          <div>
            <div class="st-3__steps">
              <p>{{activeSlide}}</p>
              <p>из</p>
              <p>3</p>
            </div>
            <button class="st-3__btn button button--light" @click="toNextSlideClick">Следующий шаг</button>
          </div>
        </div>
      </div>
      <div class="st-3__second" v-show="!slidersVisible">
        <h2 class="st-3__title h2">Ваша подборка готова</h2>
        <p class="st-3__text st-3__second-text">Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог</p>
        <form class="st-3__second-form"
              novalidate
              data-js-form
              @submit.prevent="onSubmit($event) ? sendToEmail() : ''"
        >
          <div class="st-3__second-form-content">
            <h1 class="h1">Получить предложение</h1>
            <p>Получите подборку подходящих для вас моделей на почту</p>
            <div class="st-3__second-form-inputs">
              <label>
                <input type="text"
                       placeholder="Ваше имя"
                       aria-errormessage="name-errors"
                       minlength="3"
                       maxlength="10"
                       required
                       @blur="onBlur($event)"
                       v-model="userName"
                >
                <span class="field__error" id="name-errors" data-js-form-field-errors></span>
              </label>
              <label>
                <input type="email"
                       placeholder="E-mail"
                       aria-errormessage="email-errors"
                       pattern="(^\S+@\S+\.\S+$)"
                       required
                       @blur="onBlur($event)"
                       v-model="userEmail"
                >
                <span class="field__error" id="email-errors" data-js-form-field-errors></span>
              </label>
            </div>
            <button class="button" type="submit">Получить</button>
          </div>
          <div class="st-3__second-device hidden-mobile">
            <img src="../../public/images/Iphone.png" loading="lazy"/>
            <img src="../../public/images/IphoneActive.png" loading="lazy"/>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>