<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { DateTime } from 'luxon';
//import OurPhotos from './OurPhotos.vue';
import axios from 'axios';
export default {
  components: {
    Swiper,
    SwiperSlide,
    //OurPhotos
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
      fechaObjetivo: new Date("2024-04-27T12:30:00"),

      guests: []
    }
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

      const fechaObjetivo = new Date('2024-04-27T12:30:00');
      
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
    iWillAttend(id) {
      setTimeout(() => {
        console.log(JSON.stringify(this.guests));
        let guest = this.guests.find(g => g._id === id);
        console.log(JSON.stringify(guest));
        axios({
            url: this.baseUrl + '/guest/update-guest',
            method: 'POST',
            data: { id: id, attendance: guest.attendance },
            responseType: 'json'
        }).then((response) => {
          console.log(response)
          /* if(response.data && response.data.guests) {
            this.guests = response.data.guests;
          } */
        });
      }, 1000);
      
    }
    /* toggleFullscreen() {
      var element = document.documentElement;

      if (document.fullscreenElement) {
        // Si ya estamos en pantalla completa, salir de ella
        document.exitFullscreen();
      } else {
        // De lo contrario, entrar en pantalla completa
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
    } */
  }
}
</script>

<template>
  <div class="w-full h-full">
    <Transition>
      <div v-if="corazon" class="corazon absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </Transition>
    <Transition>
      <div v-if="!corazon" class="h-full">
        <swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="0" :mousewheel="true" :modules="modules"
          class="mySwiper">
          <swiper-slide>
            <div class="color-ecf1ff w-full h-full py-5">
              <!-- <div class="absolute top-0 left-0 w-full h-full"> -->
                <!-- <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover object-center hidden lg:block lg:scale-150" src="@/assets/images/jonyykarol/3.jpg"/> -->
                <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover object-center lg:hidden" src="@/assets/images/jonyykarol/5.jpg"/>
              <!-- </div> -->
              <!-- border-green-950 -->
              <div class="relative h-full">
                <!-- <img alt="Shape" class="absolute -left-8 -top-8" src="@/assets/images/shape/ban-shape-four.png" width="125" height="125" /> -->
                <img alt="Shape" class="w-full h-full" src="@/assets/images/shape/marcohome.png"/>
                

                <div id="cuenta-regresiva" class="ml-2 absolute left-1/2 top-12 transform -translate-x-1/2 lg:left-16 lg:-translate-x-0 z-20 flex flex-row gap-1 md:gap-8 marcellus green-olivo">
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
                
                <!-- <div class="content-portada text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full">
                    <h1 class="parisiente text-2xl green-olivo flex flex-col mb-9 gap-0">
                      <span class="p-0 m-0 leading-none">Jonathan</span>
                      <span class="p-0 m-0 leading-none">&amp;</span>
                      <span class="p-0 m-0 leading-none">Karol</span>          
                    </h1>
                </div> -->

                <div class="content-portada text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full">
                  <!-- <img alt="Shape" class="top-20 mt-40 w-full md:w-12 md:h-12" src="@/assets/images/shape/marcook.png"/> -->
                  

                  <!-- <div class="box-frase-portada">
                    <p class="flex flex-col justify-center items-center marcellus green-olivo">
                      <span class="flex">
                        <img src="@/assets/images/shape/comilla-apertura.svg" class="w-4 h-4 opacity-50" alt="">
                        <span class="ml-1">Más valen dos que uno...</span>
                      </span>
                      <span class="flex items-end mb-8">
                        <span class="mr-1">Eclesiastés 4:9</span>
                        <img src="@/assets/images/shape/comilla-cierre.svg" class="w-4 h-4 opacity-50 mb-2" alt="">  
                      </span>

                      <span class="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f0958b" class="w-8 h-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </p>
                  </div> -->

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
            <div class="color-dcdee5 w-full h-full py-4">
              <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover" src="@/assets/images/jonyykarol/prueba3.jpg"/>
              <div class="relative  h-full ">
                <img alt="Shape" class="absolute w-full h-full" src="@/assets/images/shape/marcofull.png"/>
                <!-- <img alt="Shape" class="absolute -left-8 -top-8" src="@/assets/images/shape/ban-shape-four.png" width="125" height="125" /> -->

                <div class="top-14 absolute px-14 md:px-32 lg:px-60 marcellus green-olivo">
                  <span class="">
                      Estamos muy emocionados de poder celebrar este día junto a ti. 
                      Queremos empezar esta nueva aventura, rodeados de las personas que más amamos y aquellos amigos que han sembrado tanto en nuestras vidas. 
                      Esta es una invitación especial para ti y tu familia. 
                  </span>
                  <div>¡Ya falta poco! </div>
                  <div>Esperamos tu confirmación.</div>
                  <div>¡Te amamos!</div>
                  <div class="my-4 border-b-[0.5px] border-red-200"></div>
                  <div class="font-semibold">
                    TU&ME Resort
                  </div>
                  <div>
                    Carretera Camí de la Sèquia del Rei s/n  Km 1. CP. 46730 - Gandía
                  </div>
                  <div class="relative mt-6">
                    <div class="border border-red-200 rounded p-1 px-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 green-olivo">
                      <a href="https://www.google.es/maps/place/TU%26ME+Resort/@38.9954335,-0.1774899,17.02z/data=!4m20!1m10!3m9!1s0xd61c29a54f572c3:0x25b8eb9f1feed91c!2sTU%26ME+Resort!5m2!4m1!1i2!8m2!3d38.9954312!4d-0.1748761!16s%2Fg%2F11f5d97rvg!3m8!1s0xd61c29a54f572c3:0x25b8eb9f1feed91c!5m2!4m1!1i2!8m2!3d38.9954312!4d-0.1748761!16s%2Fg%2F11f5d97rvg?entry=ttu">Enlace a ubicación</a>
                    </div>
                  </div>
                </div>

                <!-- <div class="absolute bottom-10 text-2xl left-1/2 md:left-auto md:right-0 -translate-x-1/2 parisiente">
                  <span>
                    Nuestra historia de amor
                  </span>
                  <our-photos></our-photos>
                </div> -->

                <div class="arrow absolute hidden md:block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f0958b" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="color-ecf1ff w-full h-full py-4">
              <img alt="Shape" class="absolute top-0 left-0 w-full h-full opacity-70 object-cover" src="@/assets/images/jonyykarol/6.jpg"/>
              <div class="relative  h-full  flex flex-col justify-between">
                <img alt="Shape" class="absolute w-full h-full" src="@/assets/images/shape/marcofull.png"/>

                <div class="text-left top-14 absolute w-full px-14">
                    <div class="w-full flex justify-center mb-2">
                      <span class="green-olivo text-center text-sm w-full">Marque la casilla para confirmar asistencia.</span>
                    </div>
                    <div class="mt-2 flex items-center justify-between mb-4">
                      <label class="ms-2 text-sm text-gray-900 font-bold green-olivo">Nombre</label>
                      <label class="ms-2 text-sm text-gray-900 font-bold green-olivo">Asistencia</label>
                    </div>
                    <div v-for="(guest, index) in guests" :key="index" class="mt-2 flex items-center justify-between mb-4">
                      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 green-olivo">{{ guest.name }}</label>
                      <input v-model="guest.attendance" @change="iWillAttend(guest._id)" id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                      
                      <!-- <div class="flex items-center">
                          <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                      </div> -->
                    </div>
                </div>

                <div class="text-left marcellus green-olivo absolute bottom-20 px-14">
                  <div>
                    <span class="font-semibold">Precio:</span>
                    80 Є
                  </div>
                  <div>
                    No incluidos niños, excepto si está en la lista
                  </div>
                  <div>
                    <span class="font-semibold">Fecha límite de pago:</span>
                    Domingo, 7 de abril
                  </div>
                  
                  <div>
                    <span class="font-semibold">Número de cuenta:</span>
                    <div>ES10 2100 4475 1501 0033 8140</div>
                  </div>
                  <div>
                    <span class="font-semibold">Destinatario:</span> Boda Karol y Jona
                  </div>
                  <div>
                    <span class="font-semibold">Concepto:</span> Apellidos y Nombre
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
  color: #474e2c !important;
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
      /* position: absolute; */
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

