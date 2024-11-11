import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ShopPage from '@/views/ShopPage.vue'
import NewsPage from '@/views/Newspage.vue'
import EventsPage from '@/views/EventsPage.vue'
import CartPage from '@/views/CartPage.vue'
import GameDetails from '@/views/GameDetails.vue';
import store from '@/store';

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
    path: '/shop/:gameId',
    name: 'GameDetails',
    component: GameDetails,
    beforeEnter: async (to, from, next) => {
      try {
        await store.dispatch('fetchGameDetails', to.params.gameId);
        next(); // Procedi alla pagina solo quando i dati sono pronti
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
        next(false); // Blocca la navigazione in caso di errore
      }
    },
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

