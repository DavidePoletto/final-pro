<template>
    <div class="swiper" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div v-for="(screenshot, index) in screenshots" :key="index" class="swiper-slide">
          <img :src="screenshot" alt="Screenshot" class="swiperone" />
        </div>
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
    name: "GameScreenshots",
    props: {
      screenshots: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const swiperContainer = ref(null);
  
      onMounted(() => {
        if (swiperContainer.value) {
          new Swiper(swiperContainer.value, {
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
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
    width: 70vw;
    height: 30vw;
    overflow: visible;
    margin-left: auto;
    margin-right: auto;
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
    margin: 0;
    padding: 0;
    box-shadow: 10px 4px 20px rgba(0, 0, 0, 0.9);
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
  
  .swiperone {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    .swiper {
      overflow: hidden;
    }
  }
  
  @media (max-width: 768px) {
    .swiper {
      width: 90vw;
      height: 40vw;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;
    }
  
    .swiper-slide {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .swiper {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0;
    }
  
    .swiper-pagination {
      bottom: 0px;
    }
  }
  </style>
  
