<template>
  <div ref="parallaxWrap" class="parallax_wrap">
    <img class="first_bg" src="../assets/IMG/sfondo1.png" alt="background">
    
    <!-- Usa `v-show` per nascondere `big_box` con `display: none` -->
    <div v-show="showBigBox" class="big_box"></div>
    
    <img class="second_bg" src="../assets/IMG/sfondo2.png" alt="background2">
    <img class="meteor" src="../assets/IMG/sfondo3.png" alt="background3">
    <div class="rocket"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'ParallaxBackground',
  props: {
    showBigBox: {
      type: Boolean,
      default: true // Impostazione predefinita, visibile
    }
  },
  setup() {
    const parallaxWrap = ref(null);

    const parallax = (event) => {
      if (!parallaxWrap.value) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const firstImage = parallaxWrap.value.querySelector('.first_bg');
      const meteorImage = parallaxWrap.value.querySelector('.meteor');

      if (firstImage) {
        const position = 1.5;
        const x = (event.pageX - centerX) * (position / -100);
        const y = (event.pageY - centerY) * (position / 100);
        firstImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }

      if (meteorImage) {
        const positionMeteor = 1.5;
        const x = (event.pageX - centerX) * (positionMeteor / 100);
        const y = (event.pageY - centerY) * (positionMeteor / 100);
        meteorImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }
    };

    onMounted(() => {
      document.addEventListener("mousemove", parallax);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", parallax);
    });

    return {
      parallaxWrap,
    };
  }
};
</script>

<style scoped>
.parallax_wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: none;
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

.big_box {
  width: 30%;
  height: 30%;
  position: absolute;
  z-index: 2;
  background-image: url(../assets/IMG/destiny2.jpg);
  background-color: black;
  background-size: contain;
  background-position: center;
  background-attachment: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.meteor {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(80%);
}

.rocket {
  position: absolute;
  top: 10%; /* Cambia la percentuale per regolare l'altezza del razzo */
  left: -100px; /* Posizionato fuori dalla sinistra dello schermo */
  width: 100px;
  height: 100px;
  background-image: url('../assets/IMG/rocket.png'); /* Cambia con il percorso dell'immagine */
  background-size: cover;
  z-index: 4;
  animation: fly 10s linear infinite;
}

@keyframes fly {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(120vw);
  }
}
</style>

