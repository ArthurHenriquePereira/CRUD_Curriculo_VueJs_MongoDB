<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <HeaderComp />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
    <FooterComp />
  </div>
</template>

<script setup>
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'
</script>