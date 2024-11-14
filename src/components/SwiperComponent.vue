<template>
  <div class="swiper" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img class="swiperone" src="../assets/IMG/eventsIMG/giveaway.jpg" alt="giveaway image"></div>
      <div class="swiper-slide"><img class="swiperone" src="../assets/IMG/eventsIMG/nerd.webp" alt="slideimg"></div>
      <div class="swiper-slide"><img class="swiperone" src="../assets/IMG/eventsIMG/nerd1.webp" alt="slideimg"></div>
      <div class="swiper-slide"><img class="swiperone" src="../assets/IMG/eventsIMG/nerd3.webp" alt="slideimg"></div>
      <div class="swiper-slide"><img class="swiperone" src="../assets/IMG/eventsIMG/nerd4.webp" alt="slideimg"></div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  setup() {
    const swiperContainer = ref(null);

    onMounted(() => {
      if (swiperContainer.value) {
        // Controllo condizionale per dimensione dello schermo
        const isMobile = window.innerWidth <= 768;
        const spaceBetweenValue = isMobile ? 0 : 10;
        const slidesPerViewValue = isMobile ? 1 : 'auto';

        new Swiper(swiperContainer.value, {
          modules: [Navigation, Pagination, Autoplay],
          loop: true,
          slidesPerView: slidesPerViewValue,
          spaceBetween: spaceBetweenValue,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
      }
    });

    return {
      swiperContainer,
    };
  },
};
</script>

<style scoped>
.swiper {
  margin-top: 90px;
  width: 100vw;
  height: 40vw;
}

.swiper-slide {
  background-color: #eee;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 100%; /* Occupare tutta la larghezza */
  height: 100%;
  transition: transform 0.3s ease;
}

.swiper-wrapper {
  display: flex;
  align-items: center;
  justify-content: center; /* Centra le slide */
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}

.swiperone {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/* Stile per smartphone */
@media (max-width: 768px) {
  .swiper {
    height: 60vw;
    margin-top: 80px;
  }
  .swiper-slide {
    width: 100%; /* Assicurarsi che la slide occupi il 100% della larghezza */
  }
}
</style>
