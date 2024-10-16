<template>
  <div class="page">
    <MainBar />
    <div class="main_content">
      <div class="info_box">
        <h1>GAMEVERSE</h1>
        <h2>VIDEO GAME STORE</h2>
        <p>Benvenuto su GAMEVERSE, qui potrai trovare una vasta scelta di videogames e card game, tuffati anche tu nel nostro fantastico mondo dio canaglia!!</p>
        <div class="shop_button">
          <button>SHOP NOW</button>
          <button>GAYIOS</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import title from '@/components/title.vue'

export default {
  components: {
    MainBar,
    title,
  }
};
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main_content {
  height: 100%;
  background-image: url(./src/assets/IMG/sfondocopia.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  margin-top: 80px;
  position: relative;
}

.info_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  color: white;
  position: absolute;
  top: 20px;
  left: 50px;
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
  width: 25%;
  font-size: 1vw;
  margin-top: 20px;
  text-align: left;
}

@media (max-width: 768px) {
  .info_box {
    width: 80%; /* Riduci la larghezza su schermi piccoli */
    top: 20px; /* Regola il posizionamento */
    left: 20px;
  }

  .info_box h1 {
    font-size: 7vw; /* Aumenta il ridimensionamento per piccoli schermi */
  }

  .info_box h2 {
    font-size: 5vw;
  }

  .info_box p {
    width: 100%; /* Adatta il paragrafo alla larghezza del box */
  }
}
</style>