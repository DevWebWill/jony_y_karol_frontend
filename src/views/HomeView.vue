<script> 
  import LoginModalComponent from '../components/LoginModalComponent.vue'
  import { ref } from 'vue';
  export default {
    components: {
        LoginModalComponent
    },
    setup() {
      const isOpenLoginModal =  ref(true);

      /* function openLoginModal(value) {
          this.isOpenLoginModal = value
      } */

      return {
        isOpenLoginModal
      }
    }
  }
  
</script>

<template>
  <main class="h-full p-2">
    <LoginModalComponent
        :isOpen="isOpenLoginModal"
    />
  </main>
</template>
