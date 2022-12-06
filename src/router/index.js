import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetails from '../views/PokemonDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pokemon/:pokemonId',
    name: 'pokemon',
    component: PokemonDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
