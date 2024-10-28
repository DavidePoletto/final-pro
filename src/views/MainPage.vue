<template>
  <div class="page">
    <MainBar />
    <div class="container">
      <ParallaxBackground />
      <div class="info_box">
        <h1>GAMEVERSE</h1>
        <h2>VIDEO GAME STORE</h2>
        <p>
          Benvenuto su GAMEVERSE, qui potrai trovare una vasta scelta di videogames e card game!
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
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: rgb(255, 255, 255);
  position: fixed;
  z-index: 5;
  margin-top: 100px;
  margin-left: 30px;
}

.info_box h1 {
  font-size: 4.5vw;
  margin: 0;
}

.info_box h2 {
  margin: 0;
  font-size: 2.8vw;
  font-weight: 400;
  line-height: 0.3;
}

.info_box p {
  padding: 10px;
  font-size: 1vw;
  text-align: left;
}

.shop_button {
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.shop_button button {
  border: none;
  height: 30px;
  width: 100px;
  background-color: rgb(219, 125, 18);
  color: white;
  font-weight: bold;
  border-radius: 3px;
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

