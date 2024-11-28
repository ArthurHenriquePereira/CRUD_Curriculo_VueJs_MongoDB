import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import CadastrarCurriculo from '../components/CadastrarCurriculo.vue'
import VerCurriculos from '../components/VerCurriculos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/cadastrar',
    name: 'CadastrarCurriculo',
    component: CadastrarCurriculo
  },
  {
    path: '/curriculos',
    name: 'VerCurriculos',
    component: VerCurriculos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router