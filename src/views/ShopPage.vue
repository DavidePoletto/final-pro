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
      />
    </div>
    <MainFooter />
  </div>
</template>

<script>
import MainFooter from '@/components/footer.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
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
      singleplayer: mapGamesWithPrice(store.getters.singleplayerGames),
      multiplayer: mapGamesWithPrice(store.getters.multiplayerGames),
      openWorld: mapGamesWithPrice(store.getters.openWorldGames),
    }));

    const loading = computed(() => !Object.values(gamesWithPrices.value).some(games => games.length));

    const categoryTitles = {
      trending: 'TENDENZA',
      newReleases: 'NOVITÀ',
      topRated: 'PIÚ VOTATI',
      upcoming: 'IN USCITA',
      singleplayer: 'SINGLEPLAYER',
      multiplayer: 'MULTIPLAYER',
      openWorld: 'OPEN WORLD',
    };

    onMounted(() => {
      store.dispatch('fetchShopGames');
    });

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
  background-color: #2e2a2a;
  color: #fff;
  min-height: 100vh;
}

.bigimg_container {
  width: 100%;
}

.big_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  padding: 0 20px;
}
</style>