import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Steps from '../views/Steps.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {path: '/steps/:id', name: 'Pasos', component: Steps}
]

const router = new VueRouter({
  routes
})

export default router
