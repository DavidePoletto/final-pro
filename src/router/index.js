import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ShopPage from '@/views/ShopPage.vue'
import NewsPage from '@/views/NewsPage.vue'
import EventsPage from '@/views/EventsPage.vue'
import CartPage from '@/views/CartPage.vue'
import GameDetails from '@/views/GameDetails.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';

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
    props: (route) => ({ category: route.query.category })
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

  { path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage
  },

  {
    path: '/shop/:gameId',
    name: 'GameDetails',
    component: GameDetails,
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

