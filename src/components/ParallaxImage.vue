<template>
  <div class="cover_container">
    <div class="cover">
      <img ref="parallaxImage" class="parallax-image" src="@/assets/IMG/destiny2.jpg" alt="Destiny 2" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const parallaxImage = ref(null);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxImage.value) {
        parallaxImage.value.style.transform = `translateY(${scrollY * 0.1}px) scale(1.1)`;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      parallaxImage,
    };
  },
};
</script>

<style scoped>
.cover_container {
  height: 500px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
}

.cover {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}

.parallax-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s ease-out;
}


@media (max-width: 768px) {
  .parallax-image {
    z-index: 50;
    top: -50px;
  }
}
</style>


