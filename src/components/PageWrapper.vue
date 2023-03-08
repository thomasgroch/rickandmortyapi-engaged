<template>
  <div class="container mx-auto px-4 py-3">
    <!-- Page Heading -->
    <header v-if="$slots.header || title">
      <div class="px-4 sm:px-3">
        <slot name="header">
          <h2 class="text-xl font-semibold leading-tight">{{ title }}</h2>
        </slot>
      </div>
    </header>

    <!-- Page Content -->
    <main class="w-full" :class="{ 'mt-2': !$slots.header }">
      <div class="px-4 sm:px-3">
        <slot />
      </div>
      <Footer />
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})
</script>
