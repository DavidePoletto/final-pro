<template>
  <div class="section_container">
    <h2>{{ title }}</h2>
    <div v-if="loading">Caricamento...</div>
    <div v-else class="game_list">
      <div
        v-for="game in games"
        :key="game.id"
        class="game_card"
        @click="goToGameDetails(game.id)"
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

    const goToGameDetails = (gameId) => {
      router.push(`/shop/${gameId}`);
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
  margin: 40px 0;
}

.section_container h2 {
  color: #ffffff;
  font-size: 1.8rem;
  text-align: left;
  margin: 20px 20px 30px 40px;
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
    width: calc(50% - 20px); /* Due giochi per riga */
  }
}

@media (max-width: 768px) {
  .game_card {
    width: 100%; /* Un gioco per riga */
  }
}
</style>