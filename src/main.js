import { createApp, provide, h } from 'vue'
import apolloProvider from '@/apollo';

import App from '@/App.vue'
import router from '@/router'
import './tailwind.css'
import '@/assets/style.css'
import axios from 'axios'

const app = createApp({
  render: () => h(App),
})

// Provide the axios instance and baseUrl to all components
app.provide('axios', axios);
app.provide('baseUrl', baseUrl);

app.use(router)
app.mount('#app')
