import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCartStore = defineStore('cartStore', () => {
    //список кроссовок в корзине
    const cart = ref();
    cart.value = JSON.parse(localStorage.getItem('cart')) || [];
    //общая сумма корзины
    const totalPrice = computed(() => {
        let price = 0;
        cart.value.forEach(i => price += i.price);
        return price;
    })

    //получение списка корзины
    const getCartItems = async () => {
        try {
            const response = await fetch('https://106b2c587675bb4c.mokky.dev/cart');
            const data = await response.json();
            cart.value = await data;
            localStorage.setItem('cart', JSON.stringify(cart.value));
        } catch (err) {
            console.log(err);
        }
    }

    //добавление в корзину нового товара
    const putInCartItem = async (item) => {
        try {
            cart.value.push(item);
            localStorage.setItem('cart', JSON.stringify(cart.value));
            const url = 'https://106b2c587675bb4c.mokky.dev/cart';
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (!response.ok && response.name === '') {
                    throw new Error('что-то пошло не так..');
                } else {
                    getCartItems();
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    //удаление из корзины товара
    const deleteFromCartItem = async (id) => {
        try {
            cart.value = cart.value.filter(i => i.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart.value));
            const url = `https://106b2c587675bb4c.mokky.dev/cart/${id}`;
            await fetch(url, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (!response.ok && response.name === '') {
                    throw new Error('что-то пошло не так..');
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    return {
        cart,
        totalPrice,
        getCartItems,
        putInCartItem,
        deleteFromCartItem,
    }
})