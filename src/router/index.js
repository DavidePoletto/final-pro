import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ShopPage from '@/views/ShopPage.vue'
import NewsPage from '@/views/Newspage.vue'
import EventsPage from '@/views/EventsPage.vue'
import CartPage from '@/views/CartPage.vue'
import GameDetails from '@/views/GameDetails.vue';

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
    path: '/CartPage',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/shop/:gameId', component: GameDetails, props: true
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;

