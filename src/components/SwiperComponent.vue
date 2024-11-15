<template>
  <div class="swiper" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img class="swiperone" src="../assets/IMG/eventsIMG/giveaway.jpg" alt="giveaway image" />
      </div>
      <div class="swiper-slide">
        <img class="swiperone" src="../assets/IMG/eventsIMG/nerd.webp" alt="slideimg" />
      </div>
      <div class="swiper-slide">
        <img class="swiperone" src="../assets/IMG/eventsIMG/nerd1.webp" alt="slideimg" />
      </div>
      <div class="swiper-slide">
        <img class="swiperone" src="../assets/IMG/eventsIMG/nerd3.webp" alt="slideimg" />
      </div>
      <div class="swiper-slide">
        <img class="swiperone" src="../assets/IMG/eventsIMG/nerd4.webp" alt="slideimg" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  setup() {
    const swiperContainer = ref(null);

    onMounted(() => {
      if (swiperContainer.value) {
        new Swiper(swiperContainer.value, {
          modules: [Pagination, Autoplay],
          loop: true,
          slidesPerView: 1,
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
  margin-top: 120px;
  width: 100%;
  height: 40vw;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.swiperone {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .swiper {
    height: 60vw;
    margin-top: 80px;
  }
}
</style>
