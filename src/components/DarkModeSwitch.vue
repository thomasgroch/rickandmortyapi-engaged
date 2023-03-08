<template>
  <div class="flex justify-center items-center">
  	<img class="sun cursor-pointer w-8" src="/icon-sun.svg" alt="light" 
  		 @click="themeSwitch" v-show="isDarkMode">
  	<img class="moon cursor-pointer w-8 fill-blue-500" src="/icon-moon.svg" alt="dark" 
  		 @click="themeSwitch"  v-show="!isDarkMode">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Theme Vars
const isDarkMode = ref(false)
const userTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

// Icon Toggling
const iconToggle = () => {
  isDarkMode.value = !isDarkMode.value
}

// Initial Theme Check
const themeCheck = () => {
  if (userTheme === 'dark' || (!userTheme && systemTheme)) {
    document.documentElement.classList.add('dark')
    isDarkMode.value = true
    return
  }
  isDarkMode.value = false
}

// Manual Theme Switch
const themeSwitch = () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    iconToggle()
    return
  }
  document.documentElement.classList.add('dark')
  localStorage.setItem('theme', 'dark')
  iconToggle()
}

onMounted(() => {
  // Icons
  const sunIcon = document.querySelector('.sun')
  const moonIcon = document.querySelector('.moon')

  // invoke theme check on initial load
  themeCheck()
})
</script>
