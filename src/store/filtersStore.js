import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useFiltersStore = defineStore('filtersStore', () => {
    //выбранный размер
    const sizeActive = ref();
    //выбранный пол
    const sexActive = reactive({
        men: true,
        women: true,
    })
    //выбранная сумма
    const priceActive = reactive({
        min: 0,
        max: 999999,
    })

    return {
        sizeActive,
        sexActive,
        priceActive,
    }
})