import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import decode from "jwt-decode";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: { 
      requiresAuth: true,
     },
    children : [
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: () => import(/* webpackChunkName: "usuario" */ '../components/UsuariosDT.vue'),
        meta : {
          Administrador : true
        }
      },
      {
        path: 'categorias',
        name: 'Categorias',
        component: () => import(/* webpackChunkName: "categoria" */ '../components/CategoriaDT.vue'),
      },
      {
        path: 'articulos',
        name: 'Articulos',
        component: () => import(/* webpackChunkName: "articulo" */ '../components/ArticuloDT.vue'),

      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let token = localStorage.getItem('token');
    // console.log(token)
    if (!token) {
      next({
        name: 'Login',
      })
    } else {
      //si requiere administrador
      let auxRol = decode(token);
      let rolToken = auxRol["rol"];
      // console.log('Antes de validar meta admin',rolToken );
      if (to.matched.some(record => record.meta.Administrador)){
        // console.log('después de validar meta admin', auxRol);
        if(rolToken === 'Administrador'){
          next()

        }else{
          next({
            name : 'Admin'
          })
        }
      }else{
        next()
      }
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
