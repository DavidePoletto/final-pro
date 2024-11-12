<template>
  <div id="app">
    <router-view />
    <!-- Canvas per l'icona di caricamento -->
    <canvas id="favicon-canvas" width="32" height="32" style="display: none;"></canvas>
  </div>
</template>

<script>
import { watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'App',

  setup() {
    const store = useStore();
    const router = useRouter();

    // Funzione per impostare la favicon
    const setFavicon = (canvas) => {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = canvas.toDataURL('image/png');
      document.head.appendChild(link);
    };

    // Funzione per avviare la rotella di caricamento
    const startLoadingIcon = () => {
      const canvas = document.getElementById('favicon-canvas');
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
        setFavicon(canvas);
      };

      // Avvia l'animazione
      window.loadingInterval = setInterval(drawSpinner, 100);
    };

    // Funzione per fermare la rotella di caricamento
    const stopLoadingIcon = () => {
      clearInterval(window.loadingInterval);
      setFavicon('/favicon.ico'); // Ripristina la favicon originale
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

    // Eventi di routing per impostare e rimuovere lo stato di caricamento
    onMounted(() => {
      router.beforeEach((to, from, next) => {
        store.dispatch('startLoading'); // Avvia lo stato di caricamento per il routing
        next();
      });

      router.afterEach(() => {
        store.dispatch('stopLoading'); // Ferma lo stato di caricamento dopo il routing
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
