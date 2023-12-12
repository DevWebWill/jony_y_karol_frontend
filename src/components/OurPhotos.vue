<template>
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      class="mySwiper mt-2"
    >
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/8.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/10.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/11.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/12.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover h-full object-left" src="@/assets/images/jonyykarol/13.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover h-full object-left" src="@/assets/images/jonyykarol/14.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/15.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/16.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover h-full" src="@/assets/images/jonyykarol/17.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover h-full" src="@/assets/images/jonyykarol/18.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/19.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover h-full" src="@/assets/images/jonyykarol/20.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover h-full" src="@/assets/images/jonyykarol/21.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/22.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/24.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/25.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/26.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/27.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/28.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/29.jpeg"/>
      </swiper-slide>
      

      <swiper-slide>
        <img src="@/assets/images/jonyykarol/6.jpg"/>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/4.jpg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="object-cover w-full h-full" src="@/assets/images/jonyykarol/7.jpg"/>
      </swiper-slide>
    </swiper>
  </template>
  <script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // Import Swiper styles
    import 'swiper/css';
  
    import 'swiper/css/effect-cards';
  
  
    // import required modules
    import { EffectCards } from 'swiper/modules';
  
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return {
          modules: [EffectCards],
        };
      },
    };
  </script>

<style scoped>
    .swiper {
        width: 240px;
        height: 320px;
    }

    .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        font-size: 22px;
        font-weight: bold;
        color: #fff;
    }

    .swiper-slide:nth-child(1n) {
        background-color: rgb(206, 17, 17);
    }

    .swiper-slide:nth-child(2n) {
        background-color: rgb(0, 140, 255);
    }

    .swiper-slide:nth-child(3n) {
        background-color: rgb(10, 184, 111);
    }

    .swiper-slide:nth-child(4n) {
        background-color: rgb(211, 122, 7);
    }

    .swiper-slide:nth-child(5n) {
        background-color: rgb(118, 163, 12);
    }

    .swiper-slide:nth-child(6n) {
        background-color: rgb(180, 10, 47);
    }

    .swiper-slide:nth-child(7n) {
        background-color: rgb(35, 99, 19);
    }

    .swiper-slide:nth-child(8n) {
        background-color: rgb(0, 68, 255);
    }

    .swiper-slide:nth-child(9n) {
        background-color: rgb(218, 12, 218);
    }

    .swiper-slide:nth-child(10n) {
        background-color: rgb(54, 94, 77);
    }
</style>