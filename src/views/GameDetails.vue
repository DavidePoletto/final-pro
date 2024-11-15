<template>
  <div class="page">
    <MainBar />
    <div v-if="loading" class="loading-container">
      <p>Caricamento in corso...</p>
    </div>

    <div v-if="gameDetails">
      <div
        :class="['game_details_container', { 'default-bg': !backgroundImage }]"
        :style="{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }"
      >
        <div class="content_overlay">
          <h2 class="game_title">{{ gameDetails.name }}</h2>
          <p class="game_producer">{{ producer }}</p>
          <p class="game_platforms">{{ availablePlatforms }}</p>
          <div class="game_rating">
            <span>{{ gameDetails.rating?.toFixed(1) || 'N/A' }}</span>
            <span v-html="generateStars(gameDetails.rating || 0)"></span>
            <span>({{ gameDetails.ratings_count || 0 }} voti)</span>
          </div>
          <p class="price">€{{ price }}</p>
          <button @click="addToCart" :class="{ 'added': addedToCart }">
            {{ addedToCart ? 'Aggiunto al carrello' : 'Aggiungi al carrello' }}
          </button>
        </div>
      </div>

      <div class="additional_info">
        <div class="info_box">
          <p class="game_description">{{ gameDetails.description_raw }}</p>
        </div>
        <GameScreenshots v-if="gameDetails.screenshots?.length" :screenshots="gameDetails.screenshots" />
        <div class="user_ratings" v-if="gameDetails.ratings?.length">
          <h3>Valutazioni degli utenti</h3>
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

    <div v-else>Caricamento fallito o gioco non trovato.</div>

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
    const addedToCart = ref(false);

    const gameDetails = computed(() => store.getters.getCachedGameDetails(gameId));
    const price = computed(() => store.getters.getGamePrice(gameId) || route.query.price);
    const backgroundImage = computed(() =>
      gameDetails.value?.background_image_additional || gameDetails.value?.background_image
    );

    const fetchGameDetails = async () => {
      loading.value = true;
      if (!gameDetails.value) await store.dispatch('fetchGameDetails', gameId);
      loading.value = false;
    };

    const availablePlatforms = computed(() =>
      gameDetails.value?.parent_platforms
        ? gameDetails.value.parent_platforms.map(platform => platform.platform.name).join(', ')
        : 'N/A'
    );

    const pcRequirements = computed(() => {
      const pcPlatform = gameDetails.value?.platforms?.find(platform => platform.platform.slug === 'pc');
      return pcPlatform?.requirements?.minimum
        ? pcPlatform.requirements.minimum.replace(/\n/g, '<br />')
        : 'N/A';
    });

    const producer = computed(() =>
      gameDetails.value?.developers?.map(dev => dev.name).join(', ') || 'Sconosciuto'
    );

    const getStarRating = (title) => {
      const ratingMap = {
        exceptional: '5 stelle',
        recommended: '4 stelle',
        meh: '3 stelle',
        skip: '1-2 stelle',
      };
      return ratingMap[title] || title;
    };

    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    };

    const addToCart = () => {
      store.commit('addToCart', {
        id: gameDetails.value.id,
        name: gameDetails.value.name,
        price: parseFloat(price.value),
        image: gameDetails.value.background_image,
      });
      addedToCart.value = true;
      setTimeout(() => (addedToCart.value = false), 2000);
    };

    onMounted(fetchGameDetails);

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
      addedToCart,
      backgroundImage,
    };
  },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  background-color: #333;
  color: #fff;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  font-size: 1.5rem;
  background-color: #333;
}

.game_details_container {
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #333;
}

.default-bg {
  background-color: #333;
  min-height: 100vh;
}

.content_overlay {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin-left: 150px;
}

.game_title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.game_producer {
  margin: 20px 0 0 0;
}

.game_platforms {
  font-weight: 600;
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
  margin: 30px 0 10px 0;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #db7d12;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button.added {
  background-color: #4CAF50;
  transform: scale(1.05);
}

.additional_info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info_box {
  padding: 30px;
  margin-top: 50px;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
}

.user_ratings {
  width: 60%;
  background-color: #3a3a3a;
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
  background-color: #333;
  border-radius: 5px;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #db7d12;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  animation: fadeInOut 3s ease;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(10px); }
  10%, 90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
}

@media (max-width: 768px) {
  .content_overlay {
    max-width: 100%;
    margin-left: 0;
    padding: 15px;
  }

  .info_box {
    margin: 0;
  }

  .game_title {
    font-size: 2rem;
    text-align: center;
  }

  .price {
    font-size: 1.3rem;
  }

  .user_ratings, .system_requirements {
    width: 80%;
    margin-top: 60px;
  }

  .notification {
    bottom: 15px;
    right: 15px;
  }

  .game_description {
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .content_overlay {
    padding: 10px;
    max-width: 100%;
    margin: 0;
    text-align: center;
  }

  .game_title {
    font-size: 1.8rem;
  }

  .price {
    font-size: 1.2rem;
  }

  .game_rating {
    font-size: 1.2rem;
  }

  .system_requirements h3 {
    font-size: 1rem;
  }

  button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .notification {
    bottom: 10px;
    right: 10px;
  }
}
</style>
