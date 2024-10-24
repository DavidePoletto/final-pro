<template>
    <div class="swiper" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div class="swiper-slide">slide 1</div>
        <div class="swiper-slide">slide 2</div>
        <div class="swiper-slide">slide 3</div>
        <div class="swiper-slide">slide 4</div>
        <div class="swiper-slide">slide 5</div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
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
          new Swiper(swiperContainer.value, {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: -70,
            centeredSlides: true,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
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
    margin-top: 40px;
    width: 100%;
    height: 60vh;
    overflow: visible;
  }
  
  .swiper-slide {
    background-color: #eee;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    width: 85%;
    height: 100%;
    transition: transform 0.3s ease;
    border-radius: 10px;
    margin: 0;
    padding: 0;
  }
  
  .swiper-slide-active {
    transform: scale(1.1);
  }
  
  .swiper-slide {
    transform: scale(0.9);
  }
  
  .swiper-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .swiper-pagination {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
  }
  
  .swiper-button-prev, .swiper-button-next {
    color: #000;
  }
  </style>
  