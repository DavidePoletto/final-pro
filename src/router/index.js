import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ShopPage from '@/views/ShopPage.vue'
import NewsPage from '@/views/Newspage.vue'
import EventsPage from '@/views/EventsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import CartPage from '../views/CartPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/ShopPage',
    name: 'ShopPage',
    component: ShopPage,
  },
  {
    path: '/NewsPage',
    name: 'NewsPage',
    component: NewsPage,
  },
  {
    path: '/EventsPage',
    name: 'EventsPage',
    component: EventsPage,
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/CartPage',
    name: 'CartPage',
    component: CartPage,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

