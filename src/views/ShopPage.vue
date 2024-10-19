<template>
  <div class="Shop_page">
    <MainBar />
    <div class="game-library">
      <div v-if="loading">Caricamento...</div>
      <div v-else class="game-list">
        <div v-for="game in games" :key="game.id" class="game-card">
          <img :src="game.background_image" :alt="game.name" />
          <div class="game_info"> 
            <h2>{{ game.name }}</h2>
            <p>€{{ game.price.toFixed(2) }}</p> <!-- Visualizzazione del prezzo casuale -->
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
    const games = ref([]);  // Variabile reattiva per i giochi
    const loading = ref(true);  // Variabile per gestire lo stato di caricamento

    // Funzione per generare un prezzo casuale tra 2 e 30 euro
    const getRandomPrice = () => {
      return Math.random() * (30 - 2) + 2;
    };

    // Funzione per ottenere i giochi dall'API di RAWG
    const fetchGames = async () => {
      const API_KEY = '90736d80468d4a0c956e9428d59f8bbe'; // RAWG API Key
      try {
        // Chiamata all'API di RAWG
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const data = await response.json();

        // Aggiunge un prezzo casuale a ogni gioco
        games.value = data.results.map(game => ({
          ...game,
          price: getRandomPrice() // Assegna un prezzo casuale
        }));
      } catch (error) {
        console.error('Errore durante il caricamento dei giochi:', error);
      } finally {
        loading.value = false;  // Imposta lo stato di caricamento su false
      }
    };

    // Esegui la chiamata all'API una volta che il componente è montato
    onMounted(() => {
      fetchGames();
    });

    return {
      games,  // Ritorna i dati dei giochi per essere utilizzati nel template
      loading,  // Ritorna lo stato di caricamento
    };
  },
};
</script>

<style scoped>
.Shop_page {
  display: flex;
  flex-direction: column;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 75px;
}

.game-card {
  margin: 10px;
  padding: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
}

.game-card img {
  max-width: 100%;
  height: auto;
}

.game-card h2 {
  font-size: small;
  margin: 0; /* Rimuovi margine extra */
}

.game_info {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Rendi l'info box a tutta larghezza */
}

.game_info h2, .game_info p {
  margin: 0;
  font-size: small;
}
</style>


