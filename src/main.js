import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/tailwind.css'
import YouTube from 'vue3-youtube'


loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('YouTube', YouTube)
  .mount('#app')
