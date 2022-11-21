import { createRouter, createWebHistory } from 'vue-router'
import WeatherHome from '../views/WeatherHome.vue'
import WeatherApp from '../views/WeatherApp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WeatherHome
  },
  {
    path: '/weather-app',
    name: 'WeatherApp',
    component: WeatherApp
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
