<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { DateTime } from 'luxon';
import OurPhotos from './OurPhotos.vue';
import axios from 'axios';
/* import OurPhotos2 from './OurPhotos2.vue'; */
export default {
  components: {
    Swiper,
    SwiperSlide,
    OurPhotos,
    /* OurPhotos2 */
  },
  setup() {
    return {
      baseUrl: import.meta.env.VITE_APP_URL_API,
      //baseUrl: 'http://localhost:3010',
      modules: [Mousewheel, Pagination],
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,

      pruebaDate: null,
      fechaObjetivo: new Date("2024-04-27T10:00:00"),

      guests: []
    };
  },
  data() {
    return {
      corazon: true,
    }
  },
  created() {
    setTimeout(() => {
      this.corazon = false;
    }, 3500);

    /* window.addEventListener("load",function() {
      setTimeout(function(){
        window.scrollTo(0, 1);
      }, 0);
    }); */
  },
  mounted() {
    DateTime.local().setZone("Europe/Madrid");
    setInterval(function () {
      /* const ahora = DateTime.now({ zone: "Europe/Madrid" });
      this.fechaObjetivo = DateTime.fromISO("2024-04-27T10:00:00", { zone: "Europe/Madrid" });
      this.fechaObjetivoTime = this.fechaObjetivo.getTime();
      const tiempoRestante = this.fechaObjetivoTime - ahora; */

      const fechaObjetivo = new Date('2024-04-27T10:00:00');
      
      const fechaActual = DateTime.now();

      // Convierte la fecha objetivo a un objeto DateTime
      const fechaObjetivoDT = DateTime.fromJSDate(fechaObjetivo);

      // Calcula la diferencia en días, horas, minutos y segundos
      const diff = fechaObjetivoDT.diff(fechaActual, ['days', 'hours', 'minutes', 'seconds']);

      // Obtiene los valores de la diferencia
      const dias = diff.days;
      const horas = diff.hours;
      const minutos = diff.minutes;
      const segundos = Math.round(diff.seconds);

      this.dias = dias;
      this.horas = horas;
      this.minutos = minutos;
      this.segundos = segundos;

      /* this.dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
      this.horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      this.segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000); */

      /* this.pruebaDate = new Date();
      
      this.pruebaDate.setDate(this.pruebaDate.getDate()+this.dias);
      this.pruebaDate.setHours(this.pruebaDate.getHours()+this.horas);
      this.pruebaDate.setMinutes(this.pruebaDate.getMinutes()+this.minutos);


      
      if (document.getElementById("prueba") !== null) {
        document.getElementById("prueba").innerHTML = this.pruebaDate;
      } */

      // Actualiza los elementos HTML con los valores calculados

      if (document.getElementById("dias") !== null) {
        document.getElementById("dias").innerHTML = this.dias;
      }
      if (document.getElementById("horas") !== null) {
        document.getElementById("horas").innerHTML = this.horas;
      }
      if (document.getElementById("minutos") !== null) {
        document.getElementById("minutos").innerHTML = this.minutos;
      }
      if (document.getElementById("segundos") !== null) {
        document.getElementById("segundos").innerHTML = this.segundos;
      }

      // Si la fecha objetivo ha pasado, detén la cuenta regresiva
      /* if (tiempoRestante < 0) {
        clearInterval(this.cuentaRegresiva);
        document.getElementById("cuenta-regresiva").innerHTML = "¡Se acabó el tiempo!";
      } */
      if (dias === 0 && horas === 0 && minutos === 0 && segundos === 0) {
        // Detener la cuenta regresiva cuando se alcance la fecha objetivo
        clearInterval(this.cuentaRegresiva);
        console.log("¡Tiempo agotado!");
      }
    }, 1000);
  },
  beforeCreate() {
      const params = this.$route.params;
      if(params) {
        const slug = params.slug;

        axios({
            url: this.baseUrl + '/guest/get-guest',
            method: 'POST',
            data: { slug: slug },
            responseType: 'json'
        }).then((response) => {
          if(response.data && response.data.guests) {
            this.guests = response.data.guests;
          }
        });
      }
  },
  methods: {
    calcularDiferencia() {
      
    },
  },
}
</script>

<template>
  <div class="w-full h-screen">
    <Transition>
      <div v-if="corazon" class="corazon absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </Transition>
    <Transition>
      <div v-if="!corazon" class="h-full">
        <swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="0" :mousewheel="true" :modules="modules"
          class="mySwiper">
          <swiper-slide>
            <div class="color-ecf1ff w-full h-full p-8">
              <!-- <div class="absolute top-0 left-0 w-full h-full"> -->
                <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover object-center hidden lg:block lg:scale-150" src="@/assets/images/jonyykarol/3.jpg"/>
                <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover object-center lg:hidden" src="@/assets/images/jonyykarol/5.jpg"/>
              <!-- </div> -->
              
              <div class="relative border h-full border-green-950">
                <img alt="Shape" class="absolute -left-8 -top-8" src="@/assets/images/shape/ban-shape-four.png" width="125" height="125" />

                

                <div id="cuenta-regresiva" class="absolute left-1/2 top-5 transform -translate-x-1/2 lg:left-16 lg:-translate-x-0 z-20 flex flex-row gap-1 md:gap-8 marcellus green-olivo">
                  <div class="flex flex-col">
                    <span class="text-xl md:text-5xl" id="dias">{{ dias }}</span>
                    <span class="text-xs">Días</span>
                  </div>

                  <div class="relative w-6 md:w-12">
                    <img alt="Shape" class="absolute top-1 w-6 h-6 md:w-12 md:h-12" src="@/assets/images/shape/count-leaf-two.png"/>
                  </div>

                  <div class="flex flex-col">
                    <span class="text-xl md:text-5xl" id="horas">{{ horas }}</span>
                    <span class="text-xs">Horas</span>
                  </div>

                  <div class="relative w-6 md:w-12">
                    <img alt="Shape" class="absolute top-1 w-6 h-6 md:w-12 md:h-12" src="@/assets/images/shape/count-rose.png"/>
                  </div>

                  <div class="flex flex-col">
                    <span class="text-xl md:text-5xl" id="minutos">{{ minutos }}</span>
                    <span class="text-xs">Minutos</span>
                  </div>

                  <div class="relative w-6 md:w-12">
                    <img alt="Shape" class="absolute top-1 w-6 h-6 md:w-12 md:h-12" src="@/assets/images/shape/count-leaf.png"/>
                  </div>

                  <div class="flex flex-col">
                    <span class="text-xl md:text-5xl" id="segundos">{{ segundos }}</span>
                    <span class="text-xs">Segundos</span>
                  </div>
                  
                </div>
                
                <div class="arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f0958b" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

                <div class="content-portada text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <div class="box-nombres-fecha-portada flex flex-col">
                    <span class="fecha">
                      {{ fechaObjetivo.getDate() }} - {{ fechaObjetivo.getMonth() + 1 }} - {{ fechaObjetivo.getFullYear() }}          
                    </span>
                    <h1 class="parisiente border-t border-b inline p-4 mt-2 mb-4 text-5xl bo-pink green-olivo2">
                      Jonathan
                      <br class="d-md-none">
                      <span class="">&amp;</span>
                      <br class="d-md-none">
                      Karol          
                    </h1>
                  </div>

                  <div class="box-frase-portada">
                    <p class="flex flex-col justify-center items-center marcellus green-olivo2">
                      <span class="flex">
                        <img src="@/assets/images/shape/comilla-apertura.svg" class="w-4 h-4 opacity-50" alt="">
                        <span class="ml-1">Más valen dos que uno...</span>
                      </span>
                      <!-- <span>
                        porque obtienen más fruto de 
                      </span>
                      <span>
                        su esfuerzo.
                      </span> -->
                      <span class="flex items-end">
                        <!-- <span class="md:mr-1">Si caen, el uno levanta al otro.</span> -->
                        <span class="mr-1">Eclesiastés 4:9</span>
                        <img src="@/assets/images/shape/comilla-cierre.svg" class="w-4 h-4 opacity-50 mb-2" alt="">  
                      </span>
                      
                    </p>
                  </div>

                </div>
                

                <!-- <div class="absolute right-0 bottom-0">
                  <div class="relative w-[600px] h-[600px] overflow-hidden">
                    <div class="absolute w-full h-full -bottom-32 -right-32">
                      <div id="cuenta-regresiva" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-row gap-8">
                        <div class="flex flex-col">
                          <span class="text-5xl" id="dias">{{ dias }}</span>
                          <span class="text-xs">Días</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-5xl" id="horas">{{ horas }}</span>
                          <span class="text-xs">Horas</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-5xl" id="minutos">{{ minutos }}</span>
                          <span class="text-xs">Minutos</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-5xl" id="segundos">{{ segundos }}</span>
                          <span class="text-xs">Segundos</span>
                        </div>
                      </div>
                      <img alt="Shape" class="absolute" src="@/assets/images/shape/img_circuloContador01.svg" width="600" height="600" />
                      <img alt="Shape" class="absolute -top-12 -left-12" src="@/assets/images/shape/flores_contador.webp"  />
                    </div>
                  </div>
                </div> -->


              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="color-dcdee5 w-full h-full p-8">
              <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover" src="@/assets/images/jonyykarol/6.jpg"/>
              <div class="relative border h-full border-green-950">
                
                <img alt="Shape" class="absolute -left-8 -top-8" src="@/assets/images/shape/ban-shape-four.png" width="125" height="125" />

                <div class="mt-6 px-2 md:px-32 lg:px-60">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam totam, ducimus provident libero odio nam voluptatum porro fuga eligendi quidem.
                  </span>
                </div>

                <div class="absolute bottom-5 text-2xl left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 parisiente">
                  <span>
                    Nuestra historia de amor
                  </span>
                  <our-photos></our-photos>
                  <!-- <our-photos2></our-photos2> -->
                </div>

                <div class="arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f0958b" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="color-ecf1ff w-full h-full p-8">
              <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover" src="@/assets/images/jonyykarol/6.jpg"/>
              <div class="relative border h-full border-green-950">
                <div class="text-left p-2">
                  <div v-for="(guest, index) in guests" :key="index" class="mt-2">
                    {{ guest.name }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- <swiper-slide>
            <div class="color-dcdee5 w-full h-full">

            </div>
          </swiper-slide> -->
        </swiper>
      </div>
    </Transition>
  </div>
</template>

<style>
.corazon {
  width: 40px;
  height: 40px;
  background-color: rgb(229, 204, 208);
  ;
  transform: rotate(45deg);
  border-radius: 5px;
  animation: palpitar 1.5s linear infinite alternate;
  will-change: transform;
}

.corazon::before,
.corazon::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(229, 204, 208);
  border-radius: 50%;
}

.corazon::before {
  top: 0;
  left: -50%;
}

.corazon::after {
  top: -50%;
  left: 0;
}

@keyframes palpitar {
  0% {
    transform: rotate(45deg) scale(1);
  }

  50% {
    transform: rotate(45deg) scale(1.5);
  }

  100% {
    transform: rotate(45deg) scale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.color-666f88 {
  background-color: #666f88;
}

.color-788199 {
  background-color: #788199;
}

.color-8990a2 {
  background-color: #8990a2;
}

.color-dcdee5 {
  /* dcdee5 */
  /* dcdee5 */
  background-color: #dcdee5; 
}

.color-ecf1ff {
  /* ecf1ff */
  /* ecf1ff */
  background-color: #ecf1ff;
}

.marcellus {
  font-family: "Marcellus";
}

.green-olivo {
  color: #4e5143 !important;
}

.green-olivo2 {
  color: #3a3c35 !important;
}

.co-pink {
  color: #E5CCD0;
}

.bg-pink {
  background: #E5CCD0;
}

.bo-pink {
  border-color: #E5CCD0 !important;
}


.co-green {
  color: #A6A795;
}

.bo-green {
  background: #A6A795;
}

.bg-green {
  background: #A6A795;
}

    

    .arrow {
      position: absolute;
      bottom: 0;
      left: 50%;
      color: #32332d !important;
      animation: flotar 3s infinite ease-in-out;
    }

    @keyframes flotar {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }



    .parisiente {
      font-family: 'Parsiente', cursive;
    }
</style>

