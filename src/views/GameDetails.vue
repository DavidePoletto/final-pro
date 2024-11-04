<template>
    <div class="game_details_container">
      <div v-if="loading">Caricamento dettagli del gioco...</div>
      <div v-else>
        <h2>{{ gameDetails.name }}</h2>
        <img :src="gameDetails.background_image" :alt="gameDetails.name" class="game_image" />
        <p>{{ gameDetails.description_raw }}</p>
        <p class="price">Prezzo: €{{ price }}</p>
        <button @click="addToCart">Aggiungi al carrello</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const route = useRoute();
      const store = useStore();
      const gameDetails = ref(null);
      const loading = ref(true);
      const price = ref((Math.random() * (40 - 5) + 5).toFixed(2)); // Prezzo casuale tra 5 e 40 euro
  
      // GameDetails.vue
const fetchGameDetails = async () => {
  try {
    const response = await fetch(`https://server-node-lcxi.onrender.com/api/shop/games/${route.params.gameId}`);
    gameDetails.value = await response.json();
  } catch (error) {
    console.error('Errore nel caricamento dei dettagli del gioco:', error.message);
  } finally {
    loading.value = false;
  }
};

  
      const addToCart = () => {
        store.commit('addToCart', {
          id: gameDetails.value.id,
          name: gameDetails.value.name,
          price: parseFloat(price.value),
          image: gameDetails.value.background_image,
        });
        alert(`${gameDetails.value.name} aggiunto al carrello!`);
      };
  
      onMounted(fetchGameDetails);
  
      return {
        gameDetails,
        loading,
        price,
        addToCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .game_details_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #000000;
  }
  
  .game_image {
    width: 80%;
    max-width: 500px;
    margin: 20px 0;
    border-radius: 10px;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 20px 0;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    color: #ffffff;
    background-color: #db7d12;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c56b10;
  }
  </style>
  
  