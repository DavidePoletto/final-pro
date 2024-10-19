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
            <p>{{ game.price ? `$${game.price}` : 'Non disponibile' }}</p>
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

    // Funzione di ritardo per evitare il rate limit
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Funzione per ottenere giochi da RAWG e prezzi dal backend
    const fetchGames = async () => {
      const API_KEY = '90736d80468d4a0c956e9428d59f8bbe'; // RAWG API Key
      try {
        // Chiamata all'API di RAWG
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const data = await response.json();

        // Itera sui giochi per aggiungere i prezzi tramite il backend
        const gamesWithPrices = [];
        for (const game of data.results) {
          const price = await fetchPriceFromBackend(game.name);
          gamesWithPrices.push({
            ...game,
            price: price || 'Non disponibile',
          });

          // Aggiungi un ritardo di 500ms tra le richieste
          await delay(500);
        }

        games.value = gamesWithPrices;  // Assegna i giochi con i prezzi alla variabile reattiva
      } catch (error) {
        console.error('Errore durante il caricamento dei giochi:', error);
      } finally {
        loading.value = false;  // Imposta lo stato di caricamento su false
      }
    };

    // Funzione per ottenere i prezzi dal backend che comunica con CheapShark
    const fetchPriceFromBackend = async (gameName) => {
      try {
        const response = await fetch(`http://localhost:5000/api/cheapshark?title=${encodeURIComponent(gameName)}`);
        const data = await response.json();
        return data.length > 0 ? data[0].salePrice : null;  // Ritorna il prezzo se disponibile
      } catch (error) {
        console.error('Errore durante il caricamento del prezzo:', error);
        return null;  // Se c'è un errore, ritorna null
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
