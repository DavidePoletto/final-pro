<template>
  <div id="app">
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <p>
          Nota: I tempi di caricamento potrebbero essere prolungati a causa
          dell'utilizzo di server gratuiti. Grazie per la pazienza!
        </p>
        <button @click="closePopup">Chiudi</button>
      </div>
    </div>

    <CookieConsent />
    <router-view />
  </div>
</template>

<script>
import CookieConsent from '@/components/CookieConsent.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    CookieConsent,
  },
  name: 'App',

  setup() {
    const store = useStore();
    const router = useRouter();

    const showPopup = ref(false);

    onMounted(() => {
      showPopup.value = true;
    });

    const closePopup = () => {
      showPopup.value = false;
    };

    return {
      showPopup,
      closePopup,
    };
  },
};
</script>

<style scoped>
/* Stile del popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.popup p {
  font-size: 1rem;
  margin-bottom: 20px;
}

.popup button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #db7d12;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup button:hover {
  background-color: #c56b10;
}
</style>
