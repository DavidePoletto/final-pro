<template>
  <div class="page">
    <MainBar />

    <div v-if="gameDetails">
      <div
        :class="['game_details_container', { 'default-bg': !gameDetails.background_image_additional && !gameDetails.background_image }]"
        :style="{
          backgroundImage: gameDetails.background_image_additional
            ? `url(${gameDetails.background_image_additional})`
            : gameDetails.background_image
            ? `url(${gameDetails.background_image})`
            : 'none',
        }"
      >
        <div v-if="loading" class="loading">Caricamento dettagli del gioco...</div>
        
        <div v-else class="content_overlay">
          <h2 class="game_title">{{ gameDetails.name }}</h2>
          
          <div class="game_rating">
            <span>{{ gameDetails.rating.toFixed(1) }}</span>
            <span v-html="generateStars(gameDetails.rating)"></span>
            <span>({{ gameDetails.ratings_count }} voti)</span>
          </div>
          <p class="game_producer">Produttore: {{ producer }}</p>
          <p class="price">€{{ price }}</p>
          <button @click="addToCart">Aggiungi al carrello</button>
        </div>
      </div>

      <div class="platform_container">
        <p class="game_platforms">Disponibile su: {{ availablePlatforms }}</p>
      </div>

      <div class="metacritic_container">
        <div><img class="logo" src="../assets/IMG/Metacritic.png" alt=""></div>
        <div class="valutation"><p class="game_metacritic">Metacritic: {{ gameDetails.metacritic }}</p></div>
      </div>
      
      <div class="additional_info">
       
        <div class="info_box">
          <h2 class="title_description">Informazioni</h2>
          <p class="game_description">{{ gameDetails.description_raw }}</p>
        </div>

        <GameScreenshots v-if="gameDetails.screenshots && gameDetails.screenshots.length" :screenshots="gameDetails.screenshots" />

        <div class="user_ratings" v-if="gameDetails.ratings.length">
          <div class="star_value">
            <h3>Valutazioni degli utenti</h3>
            <div class="star">
              <span>{{ gameDetails.rating.toFixed(1) }}</span>
              <span v-html="generateStars(gameDetails.rating)"></span>
              <span>({{ gameDetails.ratings_count }} voti)</span>
            </div>
          </div>
          <ul>
          <li v-for="rating in gameDetails.ratings" :key="rating.id" class="rating_item">
            <div class="rating_text">
              {{ getStarRating(rating.title) }}: {{ rating.count }} voti ({{ rating.percent }}%)
            </div>
            <div class="progress_bar_container">
              <div class="progress_bar" :style="{ width: rating.percent + '%' }"></div>
            </div>
          </li>
        </ul>
        </div>
        

        
        <div class="system_requirements" v-if="pcRequirements">
          <h3>Requisiti di Sistema</h3>
          <p v-html="pcRequirements"></p>
        </div>
      </div>
    </div>
    
    <div v-else>
      Caricamento fallito o gioco non trovato.
    </div>

    <MainFooter />
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import MainFooter from '@/components/footer.vue';
import GameScreenshots from '@/components/GameScreenshots.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {
    MainBar,
    MainFooter,
    GameScreenshots,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const gameId = route.params.gameId;
    const loading = ref(true);
    const gameDetails = computed(() => store.getters.getCachedGameDetails(gameId));
    
    const price = computed(() => store.getters.getGamePrice(gameId) || route.query.price);

    // Chiamata per ottenere i dettagli del gioco solo se non sono già in cache
    const fetchGameDetails = async () => {
      if (!gameDetails.value) {
        await store.dispatch('fetchGameDetails', gameId);
      }
      loading.value = false;
    };

    onMounted(fetchGameDetails);

    // Restanti computed properties
    const availablePlatforms = computed(() => {
      return gameDetails.value?.parent_platforms
        ? gameDetails.value.parent_platforms.map(platform => platform.platform.name).join(', ')
        : 'N/A';
    });

    const pcRequirements = computed(() => {
      const pcPlatform = gameDetails.value?.platforms.find(
        platform => platform.platform.slug === 'pc'
      );
      return pcPlatform?.requirements?.minimum
        ? pcPlatform.requirements.minimum.replace(/\n/g, '<br />')
        : 'N/A';
    });

    const producer = computed(() => gameDetails.value?.developers?.map(dev => dev.name).join(', ') || 'Sconosciuto');

    // Funzione per le stelle della valutazione
    const getStarRating = (title) => {
      const ratingMap = {
        exceptional: "5 stelle",
        recommended: "4 stelle",
        meh: "3 stelle",
        skip: "1 stella",
      };
      return ratingMap[title] || title;
    };

    // Funzione per generare stelle visive
    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;

      return (
        '★'.repeat(fullStars) +
        (halfStar ? '½' : '') +
        '☆'.repeat(emptyStars)
      );
    };

    // Funzione per aggiungere al carrello
    const addToCart = () => {
      store.commit('addToCart', {
        id: gameDetails.value.id,
        name: gameDetails.value.name,
        price: parseFloat(price.value),
        image: gameDetails.value.background_image,
      });
      alert(`${gameDetails.value.name} aggiunto al carrello!`);
    };

    return {
      gameDetails,
      loading,
      price,
      addToCart,
      availablePlatforms,
      pcRequirements,
      producer,
      getStarRating,
      generateStars,
    };
  },
};
</script>


<style scoped>
.page {
  display: flex;
  flex-direction: column;
  background-color: #000000;
  color: #fff;
}

.game_details_container {
  width: 100%;
  min-height: 60vh;
  background-size: cover;
  background-position: center;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.default-bg {
  background-color: #423e3e;
}

.content_overlay {
  background-color: #333;
  padding: 20px;
  position: absolute;
  top: 300px;
  left: 50px;
  width: 450px;
}

.game_title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.game_rating {
  font-size: 1.5rem;
  color: #f1c40f;
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

button {
  margin-top: 20px;
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

.metacritic_container {
  background-color: #302d2d;
  position: absolute;
  width: 300px;
  top: 550px;
  left: 800px;
  display: flex;
  align-items: center;
}

.logo {
  padding: 20px;
  width: 50px;
}

.platform_container {
  background-color: #333;
  position: absolute;
  width: 400px;
  top: 550px;
  left: 1200px;
}

.additional_info {
  padding: 20px;
  margin-top: 200px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user_ratings {
  width: 60%;
  background-color: #000000;
  padding: 30px;
  margin-top: 100px;
}

.star_value {
  display: flex;
  justify-content: space-between;
}

.star {
  margin: 20px 0px;
  font-size: 20px;
}

/* Barre di avanzamento per le valutazioni */
.rating_item {
  margin-bottom: 15px;
}

.rating_text {
  font-size: 1rem;
  margin-bottom: 5px;
}

.progress_bar_container {
  width: 100%;
  background-color: #ddd;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
}

.progress_bar {
  height: 100%;
  background-color: #db7d12;
  transition: width 0.3s ease;
}

.info_box {
  padding: 30px;
  background-color: #000000;
  margin-top: 50px;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
}

.system_requirements {
  width: 100%;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.system_requirements h3 {
  font-size: 1.3rem;
  margin: 0;
  color: #db7d12;
}

.system_requirements p {
  line-height: 1.5;
  white-space: pre-line;
  padding: 10px;
  background-color: #222;
  border-radius: 5px;
}

</style>
