<template>
  <div class="Shop_page">
    <MainBar />
    <div class="cover_container">
      <div class="cover"></div>
    </div>
    <div class="game_library">
      <h2>Videogames</h2>
      <div v-if="loading">Caricamento...</div>
      <div v-else class="game_list">
        <div v-for="game in games" :key="game.id" class="game_card">
          <div class="image_wrapper">
            <img :src="game.background_image" :alt="game.name" />
          </div>
          <div class="game_info">
            <h2>{{ game.name }}</h2>
            <p>€{{ game.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import { ref, onMounted } from 'vue';

export default {
  components: {
    MainBar,
  },
  setup() {
    const games = ref([]);
    const loading = ref(true);

    const getRandomPrice = () => {
      return Math.random() * (30 - 2) + 2;
    };

    const fetchGames = async () => {
      const API_KEY = '90736d80468d4a0c956e9428d59f8bbe';
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const data = await response.json();

        games.value = data.results.map(game => ({
          ...game,
          price: getRandomPrice(),
        }));
      } catch (error) {
        console.error('Errore durante il caricamento dei giochi:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchGames();
    });

    return {
      games,
      loading,
    };
  },
};
</script>

<style scoped>
.Shop_page {
  display: flex;
  flex-direction: column;
}

.cover_container {
  margin-top: 75px;
  height: 400px;
}

.cover {
  background-image: url(../assets/IMG/destiny2.jpg);
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game_library {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  
}

.game_library h2 {
  align-items: center;
  align-self: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  max-width: 1200px;
  width: 100%;
}

.game_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
  
}

.game_card {
  display: flex;
  flex-direction: column;
  margin: 15px;
  min-width: 0;
  position: relative;
  width: calc(33.33333% - 30px);
}

.image_wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* Mantiene il rapporto 16:9 */
  overflow: hidden;
}

.image_wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game_card h2 {
  font-size: medium;
  margin: 0;
}

.game_info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.game_info h2, .game_info p {
  margin: 0;
  font-size: small;
}

@media (max-width: 1024px) {
  .game_list {
    padding: 0 20px;
  }

  .game_card {
    flex: 1 1 calc(33% - 20px);
  }
}

@media (max-width: 768px) {
  .game_card {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .game_card {
    flex: 1 1 100%;
  }
}
</style>
