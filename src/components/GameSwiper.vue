<template>
  <div class="swiper" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide" @click="goToGameDetails(972995)">
        <img class="swiperone" src="@/assets/IMG/games/gta6.jpg" alt="gta6 img" />
      </div>
      <div class="swiper-slide" @click="goToGameDetails(41494)">
        <img class="swiperone" src="@/assets/IMG/games/cyberpunk.jpg" alt="cyberpunk img" />
      </div>
      <div class="swiper-slide" @click="goToGameDetails(339958)">
        <img class="swiperone" src="@/assets/IMG/games/persona5.jpg" alt="persona5 img" />
      </div>
      <div class="swiper-slide" @click="goToGameDetails(3328)">
        <img class="swiperone" src="@/assets/IMG/games/thewitcher.jpg" alt="thewitcher img" />
      </div>
      <div class="swiper-slide" @click="goToGameDetails(58386)">
        <img class="swiperone" src="@/assets/IMG/games/stalker2.jpg" alt="stalker2 img" />
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  setup() {
    const swiperContainer = ref(null);
    const router = useRouter();

    const goToGameDetails = (gameId) => {
      router.push({ name: 'GameDetails', params: { gameId } });
    };

    onMounted(() => {
      if (swiperContainer.value) {
        new Swiper(swiperContainer.value, {
          modules: [Navigation, Pagination, Autoplay],
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: 0,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: true,
        });
      }
    });

    return {
      swiperContainer,
      goToGameDetails,
    };
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  background-color: #eee;
  pointer-events: visible;
  cursor: pointer;
}

.swiperone {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
