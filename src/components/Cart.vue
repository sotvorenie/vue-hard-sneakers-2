<script setup>
import CartItem from "@/components/CartItem.vue";

import {useAbsoluteBlockStore} from "@/store/absoluteBlockStore.js";
import {useCartStore} from "@/store/cartStore.js";
import EmptyCart from "@/components/icons/EmptyCart.vue";

const absoluteBlockStore = useAbsoluteBlockStore();
const cartStore = useCartStore();

//функция открытия блока заказа
const orderBlockVisible = () => {
  absoluteBlockStore.cartBlockVisible = false;
  absoluteBlockStore.orderBlockVisible = true;
}
</script>

<template>
  <div class="cart">
    <ul class="cart__list" v-auto-animate>
      <cart-item
          v-for="cartItem in cartStore.cart"
          :image-url="cartItem.gallery[0].url"
          :title="cartItem.title"
          :price="cartItem.price"
          @delete-from-cart="cartStore.deleteFromCartItem(cartItem.id)"
      />
    </ul>
    <div class="cart__info" v-if="cartStore.totalPrice !== 0">
      <div class="cart__price">
        <p>Итого</p>
        <span>{{cartStore.totalPrice.toLocaleString()}}</span>
      </div>
      <button class="cart__btn button" @click="orderBlockVisible">Перейти в корзину</button>
    </div>
    <div class="cart__empty" v-else>
      <EmptyCart/>
      <p>Корзина пустая..</p>
    </div>
  </div>
</template>