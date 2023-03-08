<template>
  <PageWrapper title="Informações do personagem">
    <router-link :to="{ name: 'Home'}">← Voltar</router-link>

    <div class="flex rounded justify-center min-w-md md:min-w-2xl mx-auto overflow-hidden py-3 flex-col md:flex-row " v-if="!loading">
      <div class="md:shrink-0">
        <img class="h-96 w-full object-cover md:h-full md:w-96" :src="character.image" :alt="character.name">
      </div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-sky-500">{{ character.name }}</div>
        <div class="grid grid-cols-2 gap-3 pb-5">
          <span class="font-bold">Status:</span>
          <span>{{ character.status }}</span>
          
          <span class="font-bold">Species:</span>
          <span>{{ character.species }}</span>
          
          <span class="font-bold">Gender:</span>
          <span>{{ character.gender }} {{ genderIcon(character.gender) }}</span>
          
          <span class="font-bold">Origin:</span>
          <span>{{ character.origin.name }}</span>
          
          <span class="font-bold">Location:</span>
          <span>{{ character.location.name }}</span>
        </div>
        
        <span class="font-bold pt-4">Episódios em que aparece:</span>
        <div class="flex flex-wrap px-3 pt-4 pb-2">
          <div v-for="(episode, k) in character.episode" :key="k"
               class="inline-block bg-gray-200 rounded-full px-2 py-1 my-1 text-sm font-semibold text-gray-700 mr-2">
            {{ getLastNumber(episode) }}
          </div>
        </div>

      </div>
    </div>

    <router-link :to="{ name: 'Home'}">← Voltar</router-link>
  </PageWrapper>
</template>

<script setup>
import { onMounted, inject, ref, computed } from 'vue'
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const character = ref({})
const loading = ref(true)
onMounted(async () => {
  const baseUrl = inject('baseUrl')
  const response = await inject('axios').get(`${baseUrl}/api/character/${props.id}`)
  character.value = response.data
  loading.value = false
})
const getLastNumber = computed(() => {
  return (url) => {
    const parts = url.split('/')
    return parts[parts.length - 1]
  }
})
const genderIcon = computed(() => {
  return (gender) => {
    return 'Female' == gender ? '♀️' : 'Male' == gender ? '♂️' : ''
  }
})
</script>
