import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Guest from '../views/Guest.vue'
import Attendance from '../views/Attendance.vue'
import store from '../store/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: Attendance,
      beforeEnter: (to, from, next) => {
          if(!store.getters['isAuthenticated']) {
              return next({
                  name: 'home'
              })
          } else {
              next()
          }
      },
      meta: {
          authorize: [
              "ROLE_ADMIN"
          ]
      },
    },
    {
      path: '/:slug',
      name: 'guest',
      component: Guest
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  //console.log(to, from, next)
  //next();
  if(import.meta.env.MODE === 'development') {
      const host = window.location.hostname+":3010";
      //console.log(host);
      store.state.baseUrlApi = 'http://'+host; 
  }

  

  const token = localStorage.st
  await store.dispatch('attempt', token)

  //let isAuthenticated = store.getters['isAuthenticated'];

  
  let permissionsUser = store.getters['getRolesUser'];
  let permissionsRoute = to.meta.authorize;
  
  if(permissionsRoute !== undefined && permissionsRoute !== null) {
      // La ruta requiere permisos
      if(permissionsUser !== undefined && permissionsUser !== null) {
          // El usuario tiene permisos pero hay que verificar si es suficiente para acceder
          if(permissionsRoute.some(pr => permissionsUser.includes(pr)) === false) {
              // El usuario no tiene permisos para acceder
              return next({
                  name: 'home'
              });
          } else {
              // El usuario tiene permisos para acceder
              next();
          }
          
      } else {
          // El usuario no tiene permisos
          return next({
              name: 'home'
          })
      }
  } else {
      // La ruta no requiere permisos
      next();
  }
  
  /* if(!store.getters['isAuthenticated']) {
      console.log("*******************1")
      return next({
          name: 'homepage'
      })
  } */
})

export default router
