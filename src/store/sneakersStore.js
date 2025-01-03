import {defineStore} from "pinia";
import {ref} from "vue";

export const useSneakersStore = defineStore('sneakersStore', () => {
    //переменная списка кроссовок
    const sneakers = ref([]);
    //переменная, хранящая количество кроссовок, которые еще остались, но не загружены
    const sneakersNumberInServer = ref();
    //переменная с количеством загружаемых кроссовок
    const sneakersNumber = ref();

    //функция получения списка кроссовок с сервера
    const getSneakers = async (number, price = {min: 0, max: 999999}, sex = '', size = '') => {
        try {
            document.querySelector('.catalog__loading').style.display = 'block';

            let filters = '';
            let sexArray = Object.values(sex);
            let allSex = ['Мужской', 'Женский'];
            let activeSex;
            if (sexArray[0] === sexArray[1]) {
                activeSex = '';
            } else {
                activeSex = allSex[sexArray.indexOf(true)];
            }
            if (!size) {
                filters = `price[from]=${price.min}&price[to]=${price.max}&info.sex=*${activeSex}`;
            } else {
                filters = `price[from]=${price.min}&price[to]=${price.max}&info.sex=*${activeSex}&sizes.size[]=${size}`;
            }

            const response = await fetch(`https://106b2c587675bb4c.mokky.dev/sneakers?${filters}&page=1&limit=${number}`);
            const data = await response.json();
            sneakers.value = await data.items;
            sneakersNumber.value = sneakers.value?.length;
            sneakersNumberInServer.value = data.meta.remaining_count;

            document.querySelector('.catalog__error').style.display = '';
        } catch (err) {
            console.log('список кроссовок не загружен..');
            document.querySelector('.catalog__error').style.display = 'block';
        } finally {
            document.querySelector('.catalog__loading').style.display = 'none';
        }
    }

    //клик на звезду рейтинга
    const putSneakerRating = async (id, starValue) => {
        try {
            let activeSneaker = sneakers.value.find(i => i.id === id);
            let activeSneakerRating = activeSneaker.rating;
            let allRatings = ['one', 'two', 'three', 'fourth', 'five'];
            activeSneakerRating[allRatings[starValue - 1]] = activeSneakerRating[allRatings[starValue - 1]] + 1;
            const url = `https://106b2c587675bb4c.mokky.dev/sneakers/${id}`;
            await fetch(url, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({rating: activeSneakerRating})
            }).then(response => {
                if (!response.ok && response.name === '') {
                    throw new Error('что-то пошло не так..');
                } else {
                    let message = document.querySelector('.sneaker-info__stars-message');
                    message.classList.add('sneaker-info__stars-message--active');
                    setTimeout(() => {
                        message.opacity = 0;
                        setTimeout(() => {
                            message.classList.remove('sneaker-info__stars-message--active');
                        }, 1000)
                    }, 3000);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    //функция отправки письма о рекомендуемых кроссовках
    const sendRecommendSneakers = async (types, sizes, comment, name, email) => {
        try {
            let item = {
                types,
                sizes,
                comment,
                userName: name,
                userEmail: email,
            }
            const url = 'https://106b2c587675bb4c.mokky.dev/recommend_sneakers';
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (!response.ok && response.name === '') {
                    throw new Error('что-то пошло не так..');
                } else {
                    location.reload();
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    return {
        sneakers,
        sneakersNumber,
        sneakersNumberInServer,
        getSneakers,
        putSneakerRating,
        sendRecommendSneakers,
    }
})