import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import {autoAnimatePlugin} from "@formkit/auto-animate/vue";

const app = createApp(App);

app.use(createPinia());
app.use(autoAnimatePlugin);

app.mount('#app')
