<script setup>
  import HomeComponent from '../components/HomeComponent.vue';
</script>

<template>
  <main class="h-full">
    <HomeComponent class="md:hidden"/>
    <div class="hidden h-full md:flex justify-center items-center">
      Invitación disponible solo en versión móvil
    </div>
  </main>
</template>
