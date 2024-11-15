<template>
  <div class="section_container">
    <h2>{{ title }}</h2>
    <div v-if="loading" class="loading-spinner-container">
      <div class="loading-spinner"></div>
    </div>
    <div v-else class="game_list">
      <div
        v-for="game in games"
        :key="game.id"
        class="game_card"
        @click="goToGameDetails(game.id, game.price)"
      >
        <img :src="game.background_image" :alt="game.name" class="game_image" />
        <div class="game_details">
          <h3>{{ game.name }}</h3>
          <p class="price">€{{ game.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    games: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();

    const goToGameDetails = (gameId, price) => {
      if (!price) {
        console.error('Prezzo non definito per il gioco con ID:', gameId);
        return;
      }
      router.push({ path: `/shop/${gameId}`, query: { price } });
    };

    return {
      goToGameDetails,
    };
  },
};
</script>

<style scoped>
.section_container {
  width: 100%;
  min-height: 600px;
  margin-bottom: 100px;
}

.section_container h2 {
  color: #ffffff;
  font-size: 2.5rem;
  text-align: left;
  margin: 20px 20px 20px 40px;
}

.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #e07509;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.game_list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
}

.game_card {
  position: relative;
  width: calc(33.333% - 20px);
  background-color: transparent;
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
  height: 15vw;
  object-fit: cover;
}

.game_details {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  color: #fff;
}

.game_details h3 {
  font-size: 1rem;
  color: #fff;
  margin: 0;
  flex: 1;
  text-align: left;
}

.game_details .price {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-align: right;
}

@media (max-width: 1024px) {
  .game_card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .game_card {
    width: 100%;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .game_image {
    height: 20vh;
  }

  .game_list {
    margin: 0 30px;
    padding: 20px;
    max-height: 500px;
    overflow-y: auto;
    background-color: rgb(122, 6, 6);
    border-radius: 20px;
  }

  .section_container {
    margin-bottom: 50px;
  }

  .section_container h2 {
    text-align: center;
    margin: 0 0 20px 0;
  }
}
</style>
