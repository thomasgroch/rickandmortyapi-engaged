<template>
  <PageWrapper title="Início">
    <div class="pl-5 pt-3 flex justify-center items-center text-slate-900 dark:text-white">
      <span class="px-3">Pesquisar por nome:</span>
      <input type="text" v-model="searchQuery" placeholder="Rick" class="p-2 rounded-md w-64 text-slate-900 bg-slate-500 dark:bg-white dark:text-slate-900 text-white" @input="currentPage = 1">
    </div>

    <div class="min-h-screen">
      <p v-if="error">Algo deu errado...</p>
      <p v-if="loading" class="flex justify-center items-center py-10">
        <svg class="animate-spin text-slate-900 dark:text-white  -ml-1 mr-3 w-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </p>
      <div v-else class="py-5">
        <div class="flex flex-wrap w-full self-center justify-center">
          <router-link :to="{ name: 'CharacterDetails', params: { id: character.id } }"
                      v-for="character in characters" 
                      :key="character.id"
                      class="m-2 p-2">
                      <img :src="character.image" class="py-2 mx-auto flex justify-center w-20 rounded-full popout" />
                      <span class="py-2 px-4 text-neutral-500 dark:text-neutral-200 tracking-wide">{{ character.name }}</span>
                  </router-link>
        </div>
        <div class="pl-5 pt-3 flex justify-center items-center flex-col">
          <span>Total de {{ characterCount }} resultados.</span>
          <div class="py-3 flex justify-around items-center w-1/2" v-if="0 != characterCount">
            <span class="hover:underline cursor-pointer" @click="currentPage--" v-if="currentPage > 1">← Anterior</span>
            <span class="hover:underline cursor-pointer" @click="goToNextPage">Próximo →</span>
          </div>
          <span class="py-3">Página #{{ currentPage }}</span>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

const currentPage = ref(1)
const searchQuery = ref('')

const variables = {
  page: currentPage,
  name: searchQuery
}

const { result, loading, error } = useQuery(gql`
  query($page: Int!, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`, variables)

const characterCount = computed(() => result.value?.characters?.info?.count ?? 0)
const characters = computed(() => result.value?.characters.results ?? [])
const episodes = computed(() => result.value?.episodesByIds ?? null)

const goToNextPage = async () => {
  currentPage.value++
  /** GraphQL interface of rickandmortyapi does not provide the total amount of pages
   ** so this is an elegant solution to this problem.
  **/
  await nextTick()
  await nextTick()
  if( ! loading && 0 == characterCount.value ) {
    currentPage.value--
  }
}
</script>

<style scoped>
.popout:hover {
  @apply transition ease-in-out delay-100 -translate-y-1 duration-300 shadow-xl
}
.popleft:hover {
  @apply transition ease-in-out delay-100 -translate-x-1 duration-300 shadow-xl
}

</style>