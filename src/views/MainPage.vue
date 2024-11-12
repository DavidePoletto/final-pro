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
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import ParallaxBackground from '@/components/ParallaxBackground.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    MainBar,
    ParallaxBackground,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
  store.dispatch('fetchShopGames');
  store.dispatch('fetchNews');
  console.log("Data loading triggered in Main component");
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


.small_box_container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20vh;
  max-height: 200px;
  position: absolute;
  bottom: 30px;
  column-gap: 5%;
  z-index: 4;
}

.small_box {
  border: 1px solid red;
  aspect-ratio: 1 / 1;
  margin: 5px;
  background-image: url(@/assets/IMG/destiny2.jpg);
  background-position: center;
  background-size: cover;
}

@media (max-width: 768px) {
  .info_box {
    width: 80%;
    top: 20px;
    left: 20px;
  }

  .info_box h1 {
    font-size: 7vw;
  }

  .info_box h2 {
    font-size: 5vw;
  }

  .info_box p {
    width: 100%;
  }

  .small_box_container {
    height: 15vh;
    column-gap: 1%;
  }
}
</style>

