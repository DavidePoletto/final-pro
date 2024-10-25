<template>
  <div class="Shop_page">
    <MainBar @search="filterGames" />
    <ParallaxImage :imageUrl="'../assets/IMG/destiny2.jpg'" title="Destiny 2: The Final Shape" />

    <!-- Sezione TENDENZA -->
    <div class="section_container">
      <h2>TENDENZA</h2>
      <div v-if="loading">Caricamento...</div>
      <div v-else class="game_list">
        <div v-for="game in trendingGames" :key="game.id" class="game_card">
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

    <!-- Sezione NOVITÀ -->
    <div class="section_container">
      <h2>NOVITÀ</h2>
      <div v-if="loading">Caricamento...</div>
      <div v-else class="game_list">
        <div v-for="game in newGames" :key="game.id" class="game_card">
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

    <!-- Sezione GIOCHI SCONTO -->
    <div class="section_container">
      <h2>GIOCHI IN SCONTO</h2>
      <div v-if="loading">Caricamento...</div>
      <div v-else class="game_list">
        <div v-for="game in discountedGames" :key="game.id" class="game_card">
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

    <MainFooter/>
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import ParallaxImage from '@/components/ParallaxImage.vue';
import MainFooter from '@/components/footer.vue';
import { ref, onMounted } from 'vue';

export default {
  components: {
    MainBar,
    ParallaxImage,
    MainFooter,
  },
  setup() {
    const games = ref([]);
    const trendingGames = ref([]);
    const newGames = ref([]);
    const discountedGames = ref([]);
    const loading = ref(true);

    const getRandomPrice = () => Math.random() * (30 - 2) + 2;

    const fetchGames = async () => {
      const API_KEY = '90736d80468d4a0c956e9428d59f8bbe';
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const data = await response.json();
        games.value = data.results.map(game => ({
          ...game,
          price: getRandomPrice(),
        }));

        // Dividi i giochi in diverse sezioni
        trendingGames.value = games.value.slice(0, 9); // Primi 9 giochi per TENDENZA
        newGames.value = games.value.slice(10, 19); // Successivi per NOVITÀ
        discountedGames.value = games.value.slice(20, 29); // Altri per GIOCHI SCONTO
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
      trendingGames,
      newGames,
      discountedGames,
      loading,
    };
  }
};
</script>

<style scoped>
.Shop_page {
  display: flex;
  flex-direction: column;
  background-color: rgb(48, 44, 44);
}

.section_container {
  margin: 50px 0;
}

.section_container h2 {
  color: white;
  text-align: center;
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
  transition: transform 0.3s ease;
}

.game_card:hover {
  transform: scale(1.05);
}

.image_wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 10px;
}

.image_wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game_info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.game_info h2, .game_info p {
  color: white;
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



