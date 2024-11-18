import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Importa il tuo store Vuex

// Importa le pagine
import MainPage from '@/views/MainPage.vue';
import ShopPage from '@/views/ShopPage.vue';
import NewsPage from '@/views/NewsPage.vue';
import EventsPage from '@/views/EventsPage.vue';
import CartPage from '@/views/CartPage.vue';
import GameDetails from '@/views/GameDetails.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import LoginPage from '@/views/LoginPage.vue';

// Definizione delle rotte
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
    props: (route) => ({ category: route.query.category }),
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
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/shop/:gameId',
    name: 'GameDetails',
    component: GameDetails,
  },

  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  

  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  }
];

// Configurazione del router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // Forza lo scroll all'inizio su ogni cambio di pagina
  },
});

export default router;
