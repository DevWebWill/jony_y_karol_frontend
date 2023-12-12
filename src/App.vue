<script setup>
import { /* RouterLink, */ RouterView } from 'vue-router'
</script>

<template>
  

  <div class="h-screen">
    <!-- <header class="fixed w-full py-2 z-20">
        <nav class="py-2">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
    </header> -->
    
    <RouterView />
  </div>
  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
