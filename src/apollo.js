import Vue from 'vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http';
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const baseUrl = 'https://thomas-wwwcors.herokuapp.com/https://rickandmortyapi.com'
const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
})

const cache = new InMemoryCache()
const defaultClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient
});

export default apolloProvider;