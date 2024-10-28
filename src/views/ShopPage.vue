<template>
  <div class="Shop_page">
    <MainBar />

    <div class="big_container">
      <!-- Sezione TENDENZA -->
      <div class="section_container">
        <h2>TENDENZA</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in trendingGames" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>

      <!-- Sezione NOVITÀ -->
      <div class="section_container">
        <h2>NOVITÀ</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in newReleases" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>

      <!-- Sezione MIGLIORI VOTATI -->
      <div class="section_container">
        <h2>MIGLIORI VOTATI</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in topRated" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>

      <!-- Sezione IN USCITA -->
      <div class="section_container">
        <h2>IN USCITA</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in upcomingGames" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>

      <!-- Sezione INDIE -->
      <div class="section_container">
        <h2>INDIE</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in indieGames" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>

      <!-- Sezione MULTIPLAYER -->
      <div class="section_container">
        <h2>MULTIPLAYER</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in multiplayerGames" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>

      <!-- Sezione OPEN WORLD -->
      <div class="section_container">
        <h2>OPEN WORLD</h2>
        <div v-if="loading">Caricamento...</div>
        <div v-else class="game_list">
          <div v-for="game in openWorldGames" :key="game.id" class="game_card">
            <img :src="game.background_image" :alt="game.name" class="game_image" />
            <h3>{{ game.name }}</h3>
            <p>€{{ game.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MainBar from '@/components/Header.vue';

export default {
  components: {
    MainBar,
  },
  setup() {
    const store = useStore();

    // Usa i getters per ottenere i dati per tutte le categorie
    const trendingGames = computed(() => store.getters.trendingGames);
    const newReleases = computed(() => store.getters.newReleases);
    const topRated = computed(() => store.getters.topRatedGames);
    const upcomingGames = computed(() => store.getters.upcomingGames);
    const indieGames = computed(() => store.getters.indieGames);
    const multiplayerGames = computed(() => store.getters.multiplayerGames);
    const openWorldGames = computed(() => store.getters.openWorldGames);

    const loading = computed(() => {
  // Considera che il caricamento sia completato se almeno una categoria ha dati
  return !(
    trendingGames.value.length ||
    newReleases.value.length ||
    topRated.value.length ||
    upcomingGames.value.length ||
    multiplayerGames.value.length ||
    openWorldGames.value.length
  );
});


    onMounted(() => {
  store.dispatch('fetchShopGames').then(() => {
    console.log("Trending games:", trendingGames.value);
    console.log("New releases:", newReleases.value);
    // aggiungi log per tutte le categorie
  });
});

    return {
      loading,
      trendingGames,
      newReleases,
      topRated,
      upcomingGames,
      indieGames,
      multiplayerGames,
      openWorldGames,
    };
  },
};
</script>


<style scoped>
.Shop_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111;
  color: #fff;
  min-height: 100vh;
}

.big_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  padding: 0 20px;
}

.section_container {
  width: 100%;
  margin: 40px 0;
}

.section_container h2 {
  color: #ffcc00;
  font-size: 1.8rem;
  text-align: left;
  margin-bottom: 15px;
}

.game_list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
}

.game_card {
  width: calc(33.333% - 20px); /* Tre giochi per riga */
  max-width: 300px;
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.game_card:hover {
  transform: scale(1.05);
}

.game_image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #ffcc00;
}

.game_card h3 {
  font-size: 1rem;
  color: #fff;
  padding: 10px;
}

@media (max-width: 1024px) {
  .game_card {
    width: calc(50% - 20px); /* Due giochi per riga */
  }
}

@media (max-width: 768px) {
  .game_card {
    width: 100%; /* Un gioco per riga */
  }
}

</style>
