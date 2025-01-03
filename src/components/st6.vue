<script setup>
import vk from "@/components/icons/vk.vue";
import instagram from "@/components/icons/instagram.vue";
</script>

<template>
  <section class="st-6">
    <div class="st-6__inner container">
      <div class="st-6__left">
        <h2 class="st-6__title section-title h2">Контакты</h2>
        <ul class="st-6__list">
          <li class="st-6__item">
            <div class="st-6__title-item">
              <p>главный офис</p>
              <span>?</span>
            </div>
            <p class="st-6__number">+7 800 789 89 89</p>
            <p class="st-6__address">г. Санкт-Петербург, Комсомольская, 43 к1</p>
          </li>
          <li class="st-6__item">
            <div class="st-6__title-item">
              <p>отдел продаж</p>
            </div>
            <p class="st-6__number">+7 800 789 89 89</p>
            <p class="st-6__address">г. Санкт-Петербург, Комсомольская, 43 к1</p>
          </li>
        </ul>
        <ul class="st-6__links">
          <li class="st-6__links-item">
            <a href="" class="st-6__link"><vk/></a>
          </li>
          <li class="st-6__links-item">
            <a href="" class="st-6__link"><instagram/></a>
          </li>
        </ul>
      </div>
      <div class="st-6__right image-container">
<!--        <iframe class="st-6__map" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab4b3b792f3ab23c590c25fef82d910cb277aba4aa15dd72b094b1348571e4938&amp;source=constructor" width="701" height="556" frameborder="0"></iframe>&ndash;&gt;-->
      </div>
    </div>
  </section>
</template>