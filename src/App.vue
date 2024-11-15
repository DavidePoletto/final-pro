<template>
  <div id="app">
    <router-view />
    <canvas ref="faviconCanvas" width="32" height="32" style="display: none;"></canvas>
  </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  name: 'App',

  setup() {
    const store = useStore();
    const router = useRouter();
    const faviconCanvas = ref(null);

    // Funzione per impostare la favicon
    const setFavicon = () => {
      // Verifica che il canvas sia un HTMLCanvasElement valido
      if (!faviconCanvas.value || !(faviconCanvas.value instanceof HTMLCanvasElement)) {
        console.error("Canvas non trovato o non è un HTMLCanvasElement");
        return;
      }
      
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = faviconCanvas.value.toDataURL('image/png');
      document.head.appendChild(link);
    };

    // Funzione per avviare la rotella di caricamento
    const startLoadingIcon = () => {
      const canvas = faviconCanvas.value;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let angle = 0;
      const drawSpinner = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(16, 16, 12, angle, angle + Math.PI / 1.5);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
        ctx.stroke();
        angle += 0.1;
        setFavicon();
      };

      window.loadingInterval = setInterval(drawSpinner, 100);
    };

    // Funzione per fermare la rotella di caricamento
    const stopLoadingIcon = () => {
      clearInterval(window.loadingInterval);
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = '/favicon.ico'; // Ripristina la favicon originale
      document.head.appendChild(link);
    };

    // Monitorare lo stato di caricamento globale
    watch(
      () => store.getters.isLoading('games') || store.getters.isLoading('news'),
      (isLoading) => {
        if (isLoading) {
          startLoadingIcon();
        } else {
          stopLoadingIcon();
        }
      }
    );

    onMounted(() => {
      router.beforeEach((to, from, next) => {
        store.commit('setLoading', { key: 'games', value: true });
        next();
      });

      router.afterEach(() => {
        store.commit('setLoading', { key: 'games', value: false });
      });
    });
  },
};
</script>

<style>
#favicon-canvas {
  display: none;
}
</style>
