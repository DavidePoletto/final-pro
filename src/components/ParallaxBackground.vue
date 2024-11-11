<template>
  <div ref="parallaxWrap" class="parallax_wrap" @mousemove="handleMouseMove">
    <img class="first_bg" src="../assets/IMG/sfondo1.png" alt="background" />
    
    <div v-show="showBigBox" class="big_box">
      <GameSwiper />
    </div>
    
    <img class="second_bg" src="../assets/IMG/sfondo2.png" alt="background2" />
    <img class="meteor" src="../assets/IMG/sfondo3.png" alt="background3" />
    <div class="rocket"></div>

    <!-- Small boxes for mouse-following effect -->
    <div class="small_box_container">
      <div class="small_box" v-for="i in 4" :key="i" :class="'box-' + i"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import GameSwiper from './GameSwiper.vue';
import gta6Cover from '@/assets/IMG/games/gta6.jpg';
import persona5Cover from '@/assets/IMG/games/persona5.jpg';
import cyberpunkCover from '@/assets/IMG/games/cyberpunk.jpg';
import stalker2Cover from '@/assets/IMG/games/stalker2.jpg';
import theWitcherCover from '@/assets/IMG/games/thewitcher.jpg';

export default {
  name: 'ParallaxBackground',
  components: {
    GameSwiper,
  },
  props: {
    showBigBox: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const parallaxWrap = ref(null);
    const recommendedGames = ref([
      { name: 'Gta6', cover: gta6Cover },
      { name: 'Persona 5', cover: persona5Cover },
      { name: 'Cyberpunk', cover: cyberpunkCover },
      { name: 'Stalker 2', cover: stalker2Cover },
      { name: 'The Witcher', cover: theWitcherCover },
    ]);

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

    const handleMouseMove = (event) => {
      document.querySelectorAll('.small_box').forEach((box, index) => {
        const movementStrength = 15;
        const offsetX = (event.clientX / window.innerWidth - 0.5) * movementStrength * (index % 2 === 0 ? 1 : -1);
        const offsetY = (event.clientY / window.innerHeight - 0.5) * movementStrength * (index % 2 === 0 ? -1 : 1);
        box.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    onMounted(() => {
      document.addEventListener('mousemove', parallax);
      document.addEventListener('mousemove', handleMouseMove);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', parallax);
      document.removeEventListener('mousemove', handleMouseMove);
    });

    return {
      parallaxWrap,
      recommendedGames,
    };
  },
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
  pointer-events: none;
}

.big_box {
  width: 30%;
  height: 35%;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  z-index: 2;
  pointer-events: auto;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.big_box:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.4),  /* Ombra più grande durante l'hover */
    0 16px 32px rgba(0, 0, 0, 0.3), 
    0 24px 48px rgba(0, 0, 0, 0.2); /* Effetto più profondo e diffuso */
}

.second_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
  pointer-events: none;
}

.meteor {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(80%);
  pointer-events: none;
}

.rocket {
  position: absolute;
  top: 10%;
  left: -100px;
  width: 100px;
  height: 100px;
  background-image: url('../assets/IMG/rocket.png');
  background-size: cover;
  z-index: 4;
  animation: fly 10s linear infinite;
}

.small_box_container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40vh;
  max-height: 250px;
  position: absolute;
  bottom: 30px;
  column-gap: 5%;
  z-index: 4;
  pointer-events: none;
}

.small_box {
  width: 150px;
  height: 200px;
  background-image: url(@/assets/IMG/destiny2.jpg);
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  transition: transform 0.1s ease-out;
  pointer-events: auto;
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
