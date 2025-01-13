import { createApp } from 'vue'
import App from './App.vue'

import router from '../router'
import { createPinia } from 'pinia'

import ToastService from 'primevue/toastservice'

import './style/global.css'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import ThemePreset from './style/theme.ts'

import 'virtual:uno.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(pinia)

app.use(PrimeVue, {
    theme: {
        preset: ThemePreset,
        options: {
            darkModeSelector: '.app--dark',
        },
    },
    ripple: true,
})

app.use(ToastService)
app.mount('#app')
