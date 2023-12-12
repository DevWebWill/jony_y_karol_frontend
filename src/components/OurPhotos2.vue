<template>
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <img src="@/assets/images/jonyykarol/8.png" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/10.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/11.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/12.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/13.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/14.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-9.jpg"/>
      </swiper-slide>
    </swiper>
  </template>
  <script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // Import Swiper styles
    import 'swiper/css';
  
    import 'swiper/css/effect-coverflow';
    import 'swiper/css/pagination';
    
    // import required modules
    import { EffectCoverflow, Pagination } from 'swiper/modules';
  
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return {
          modules: [EffectCoverflow, Pagination],
        };
      },
    };
  </script>

<style scoped>
    .swiper {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 300px;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
    }
</style>
  