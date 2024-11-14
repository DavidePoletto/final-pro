<template>
  <div class="Shop_page">
    <MainBar />
    <div class="bigimg_container">
      <ParallaxImage />
    </div>
    <div class="big_container">
      <CategorySection
        v-for="(games, category) in gamesWithPrices"
        :key="category"
        :title="categoryTitles[category]"
        :games="games"
        :loading="loading"
        :id="category"
      />
    </div>
    <MainFooter />
  </div>
</template>

<script>
import MainFooter from '@/components/footer.vue';
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import MainBar from '@/components/Header.vue';
import ParallaxImage from '@/components/ParallaxImage.vue';
import CategorySection from '@/components/CategorySection.vue';

export default {
  components: {
    MainBar,
    ParallaxImage,
    MainFooter,
    CategorySection,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const generateRandomPrice = () => (Math.random() * (40 - 5) + 5).toFixed(2);

    const mapGamesWithPrice = (games) => {
      return (games || []).map((game) => {
        const price = store.getters.getGamePrice(game.id) || generateRandomPrice();
        if (!store.getters.getGamePrice(game.id)) {
          store.commit('setGamePrice', { gameId: game.id, price });
        }
        return { ...game, price };
      });
    };

    const gamesWithPrices = computed(() => ({
      trending: mapGamesWithPrice(store.getters.trendingGames),
      newReleases: mapGamesWithPrice(store.getters.newReleases),
      topRated: mapGamesWithPrice(store.getters.topRatedGames),
      upcoming: mapGamesWithPrice(store.getters.upcomingGames),
      nintendoGames: mapGamesWithPrice(store.getters.nintendoGames),
      multiplayer: mapGamesWithPrice(store.getters.multiplayerGames),
    }));

    const loading = computed(() => !Object.values(gamesWithPrices.value).some(games => games.length));

    const categoryTitles = {
      trending: 'TENDENZA',
      newReleases: 'PC',
      topRated: 'PIÚ VOTATI',
      upcoming: 'IN USCITA',
      nintendoGames: 'GIOCHI NINTENDO',
      multiplayer: 'MULTIPLAYER',
    };

    const scrollToCategory = () => {
      const category = window.location.hash.substring(1); // Rimuove il simbolo #
      if (category) {
        const section = document.getElementById(category);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    onMounted(() => {
      store.dispatch('fetchShopGames').then(() => {
        scrollToCategory(); // Scrolla alla sezione dopo il caricamento
      });
    });

    watch(
      () => route.hash,
      () => {
        scrollToCategory(); // Scrolla alla sezione ogni volta che cambia l'hash
      }
    );

    return {
      loading,
      gamesWithPrices,
      categoryTitles,
    };
  },
};
</script>

<style>
.Shop_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f2c2c;
  color: #fff;
  min-height: 100vh;
}

.bigimg_container {
  width: 100%;
  position: sticky;
}

.big_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .big_container {
    padding: 0;
  }

  .Shop_page {
    background-image: url(../assets/IMG/underground.jpg);
    background-color:#9a1d34;
    background-size: cover;

  }
}
</style>
