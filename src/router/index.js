import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/pages/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth'
    },
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/password-reset',
    name: 'Password reset',
    meta: {
      layout: 'auth'
    },
    component: () => import('../views/auth/PasswordReset.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
