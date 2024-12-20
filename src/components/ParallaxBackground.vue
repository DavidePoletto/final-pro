<template>
  <div ref="parallaxWrap" class="parallax_wrap" @mousemove="handleMouseMove">
    <img class="first_bg" src="../assets/IMG/backgrounds/sfondo1.webp" alt="background" />
    
    <div v-show="showBigBox" class="big_box">
      <GameSwiper />
    </div>
    
    <img class="second_bg" src="../assets/IMG/backgrounds/sfondo2.webp" alt="background2" />
    <img class="meteor" src="../assets/IMG/backgrounds/sfondo3.webp" alt="background3" />
    <div class="rocket"></div>

    <!-- Small boxes for mouse-following effect -->
    <div class="small_box_container" v-show="showBigBox">
      <div class="small_box box-1" @click="navigateToSection('nintendoGames')"><h3>NINTENDO</h3></div>
      <div class="small_box box-2" @click="navigateToSection('upcoming')"><h3>IN USCITA</h3></div>
      <div class="small_box box-3" @click="navigateToSection('multiplayer')"><h3>MULTYPLAYER</h3></div>
      <div class="small_box box-4" @click="navigateToSection('newReleases')"><h3>PC GAMES</h3></div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import GameSwiper from './GameSwiper.vue';
import { useRouter } from 'vue-router';
import gta6Cover from '@/assets/IMG/games/gta6.webp';
import persona5Cover from '@/assets/IMG/games/persona5.webp';
import cyberpunkCover from '@/assets/IMG/games/cyberpunk.webp';
import stalker2Cover from '@/assets/IMG/games/stalker2.webp';
import theWitcherCover from '@/assets/IMG/games/thewitcher.webp';

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
    const router = useRouter();
    const recommendedGames = ref([
      { name: 'Gta6', cover: gta6Cover },
      { name: 'Persona 5', cover: persona5Cover },
      { name: 'Cyberpunk', cover: cyberpunkCover },
      { name: 'Stalker 2', cover: stalker2Cover },
      { name: 'The Witcher', cover: theWitcherCover },
    ]);

    const navigateToSection = (category) => {
      router.push({ name: 'ShopPage', hash: `#${category}` });
    };



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
    let offsetX, offsetY;

    switch (index % 4) {
      case 0:
        offsetX = (event.clientX / window.innerWidth - 0.5) * movementStrength;
        offsetY = (event.clientY / window.innerHeight - 0.5) * -movementStrength;
        break;
      case 1:
        offsetX = (event.clientX / window.innerWidth - 0.5) * -movementStrength;
        offsetY = (event.clientY / window.innerHeight - 0.5) * movementStrength;
        break;
      case 2:
        offsetX = (event.clientX / window.innerWidth - 0.5) * -movementStrength;
        offsetY = (event.clientY / window.innerHeight - 0.5) * -movementStrength;
        break;
      case 3:
        offsetX = (event.clientX / window.innerWidth - 0.5) * movementStrength;
        offsetY = (event.clientY / window.innerHeight - 0.5) * movementStrength;
        break;
    }

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
      navigateToSection,
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
    0 8px 16px rgba(0, 0, 0, 0.4),
    0 16px 32px rgba(0, 0, 0, 0.3), 
    0 24px 48px rgba(0, 0, 0, 0.2);
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
  background-image: url('../assets/IMG/icons/rocket.webp');
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

.small_box_container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40vh;
  max-height: 250px;
  position: absolute;
  bottom: 70px;
  column-gap: 9%;
  pointer-events: none;
}

.small_box {
  width: 150px;
  height: 200px;
  background-size: cover;
  border-radius: 15px;
  cursor: default;
  pointer-events: auto;
  z-index: 2;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.small_box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.small_box:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
  filter: brightness(110%);
  z-index: 5;
  border: 2px solid rgb(255, 255, 255);
  box-sizing: border-box;
}

.small_box:hover::after {
  opacity: 1;
}

.small_box:first-child {
  background-image: url(../assets/IMG/nintendo.webp);
}

.small_box:nth-child(2) {
  background-image: url(../assets/IMG/nuoveuscite.webp);
}

.small_box:nth-child(3) {
  background-image: url(../assets/IMG/multiplayer.webp);
}

.small_box:nth-child(4) {
  background-image: url(../assets/IMG/pcgames.webp);
}

.small_box h3 {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
  text-align: center;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.small_box:hover h3 {
  opacity: 1;
}

@keyframes continuousMovement {
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(-5px, 5px); }
  75% { transform: translate(6px, 6px); }
  100% { transform: translate(0px, 0px); }
}

@media (max-width: 1024px) {
  .big_box {
    width: 60%;
    height: 30%;
    top: 50%;
  }

  .small_box {
    width: 120px;
    height: 150px;
  }

  .small_box_container {
    height: 30vh;
    column-gap: 6%;
  }
}

@media (max-width: 768px) {
  .meteor {
    left: -250px;
    width: 250%;
    height: 83%; 
    object-fit: contain;
    z-index: 10;
    animation: continuousMovement 8s infinite ease-in-out;
  }

  .rocket {
    z-index: 10;
  }

  .big_box {
    width: 90%;
    height: 25%;
    top: 50%;
  }

  .small_box_container {
  display: none;
}
}
</style>
