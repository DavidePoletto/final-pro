<template>
  <div class="page">
    <MainBar />
    <div class="container">
      <div ref="parallaxWrap" class="parallax_wrap">
        <img class="first_bg" src="../assets/IMG/sfondo3.png" alt="background">
        <img class="second_bg" src="../assets/IMG/sfondo21.png" alt="background2">
      </div>
      <div class="info_box">
        <h1>GAMEVERSE</h1>
        <h2>VIDEO GAME STORE</h2>
        <p>
          Benvenuto su GAMEVERSE, qui potrai trovare una vasta scelta di videogames e card game, tuffati anche tu nel nostro fantastico mondo di canaglia!!
        </p>
        <div class="shop_button">
          <button>SHOP NOW</button>
          <button>GAYIOS</button>
        </div>
      </div>
      <div class="small_box_container">
      <div class="small_box"></div>
      <div class="small_box"></div>
      <div class="small_box"></div>
      <div class="small_box"></div>
      <div class="small_box"></div>
    </div>
    </div>
    <div class="big_box"></div>
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import MainFooter from '@/components/footer.vue'

export default {
  components: {
    MainBar,
    MainFooter,
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.parallaxWrap) {
        document.addEventListener("mousemove", this.parallax);
      } else {
        console.error("parallaxWrap not found.");
      }
    });
  },
  methods: {
    parallax(event) {
      // Controlla che parallaxWrap esista
      if (!this.$refs.parallaxWrap) {
        return;
      }

      // Calcola il centro della finestra
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Applica il movimento solo alla prima immagine (first_bg)
      const firstImage = this.$refs.parallaxWrap.querySelector(".first_bg");
      if (firstImage) {
        const position = 1.5; // Imposta l'intensità del movimento

        const x = (event.pageX - centerX) * (position / -100); 
        const y = (event.pageY - centerY) * (position / 100);

        firstImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.parallax);
  }
}
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

.parallax_wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.first_bg {
  position: absolute;
  top: -30px;
  left: -30px;
  width: 110%;
  height: 100%;
  transform-origin: center;
  object-fit: cover;
  z-index: 1;
  filter: brightness(60%);
}

.second_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

.info_box {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  position: fixed;
  z-index: 4;
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
  width: 60%;
  font-size: 1vw;
  margin-top: 20px;
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

.big_box {
  width: 30%;
  height: 30%;
  position: absolute;
  z-index: 2;
  background-image: url(./src/assets/IMG/GAMEVERSE.png);
  background-color: black;
  background-size: contain;
  background-position: center;
  background-attachment: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.small_box_container {
  display: flex;
  justify-content: space-around;
  border: 1px solid rgb(214, 252, 0);
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 50px;
}

.small_box {
  border: 1px solid red;
  width: 15%;
  background-color: black;
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
}
</style>
