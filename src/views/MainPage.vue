<template>
  <div class="page">
    <MainBar />
    <div class="container">
      <ParallaxBackground />
      <div class="info_box">
        <h1>GAMEVERSE</h1>
        <h2>VIDEO GAME STORE</h2>
        <p>
          Benvenuto su Gameverse, dove i mondi virtuali ti attendono e ogni gioco diventa un'avventura epica da vivere.
        </p>
        <div class="shop_button">
          <button @click="navigateToShop">SHOP NOW</button>
          <button @click="navigateToNews">NEWS</button>
        </div>
      </div>
    </div>
    <div v-if="isMobile" class="shop_section">
      <ShopPage />
    </div>
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import ParallaxBackground from '@/components/ParallaxBackground.vue';
import ShopPage from '@/views/ShopPage.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    MainBar,
    ParallaxBackground,
    ShopPage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isMobile = ref(window.innerWidth <= 768);

    // Rileva il ridimensionamento della finestra
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      store.dispatch('fetchShopGames');
      store.dispatch('fetchNews');
      window.addEventListener('resize', handleResize);
    });

    // Rimuovi l'evento al momento dello smontaggio
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    const navigateToShop = () => {
      router.push('/ShopPage');
    };

    const navigateToNews = () => {
      router.push('/NewsPage');
    };

    return {
      navigateToShop,
      navigateToNews,
      isMobile,
    };
  },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100vw;
}

.container {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.info_box {
  max-width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  position: fixed;
  z-index: 5;
  margin-top: 100px;
  margin-left: 30px;
  padding: 20px;
}

.info_box h1 {
  font-size: 4.5vw;
  margin: 0;
  background: linear-gradient(90deg, #ff4d00, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Testo sfumato */
  font-weight: 700;
}

.info_box h2 {
  font-size: 2.8vw;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  line-height: 0.3;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.info_box p {
  font-size: 1.1vw;
  color: #ffffff;
  text-align: center;
  font-weight: 400;
}

.shop_button {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 50px;
}

.shop_button button {
  border: none;
  height: 35px;
  width: 110px;
  background: linear-gradient(90deg, #f59904, #ff781e); /* Sfondo sfumato per pulsanti */
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-size: 0.9rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Ombra morbida */
}

.shop_button button:hover {
  transform: scale(1.08);
  box-shadow: 0px 6px 15px rgba(255, 112, 175, 0.5), 0px 6px 15px rgba(255, 218, 68, 0.5); /* Effetto brillante */
}

.shop_section {
  background-color: #f5f5f5;
  width: 100%;
}

@media (max-width: 1024px) {
  .info_box {
    width: 80%;
    margin-top: 80px;
    margin-left: 20px;
    padding: 15px;
  }

  .info_box h1 {
    font-size: 6vw;
  }

  .info_box h2 {
    font-size: 4.5vw;
  }

  .info_box p {
    font-size: 1.5vw;
  }

  .shop_button button {
    height: 30px;
    width: 100px;
    font-size: 0.8rem;
  }

  .small_box_container {
    height: 15vh;
    column-gap: 2%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .container {
    justify-content: center;
  }

  .info_box {
    width: 95%;
    padding: 5px;
    text-align: center;
    margin: 0;
    position: absolute;
    top: 110px;
  }

  .info_box h1 {
    font-size: 10vw;
  }

  .info_box h2 {
    font-size: 6vw;
  }

  .info_box p {
    font-size: 4vw;
    margin: 10px 0;
  }

  .shop_button {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    display: none;
  }

  .small_box_container {
    height: auto;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 5%;
    justify-content: center;
  }

  .small_box {
    width: 90px;
    height: 90px;
    margin: 5px;
  }
}
</style>
