import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http';

const baseUrl = 'https://thomas-wwwcors.herokuapp.com/https://rickandmortyapi.com'
const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

import App from '@/App.vue'
import router from '@/router'
import './tailwind.css'
import '@/assets/style.css'
import axios from 'axios'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

// Provide the axios instance and baseUrl to all components
app.provide('axios', axios);
app.provide('baseUrl', baseUrl);

app.use(router)
app.mount('#app')
