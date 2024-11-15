// src/components/CookieConsent.vue
<template>
  <div v-if="!cookieConsent" class="cookie-banner">
    <p>Questo sito utilizza i cookie per migliorare l'esperienza utente.</p>
    <button @click="acceptCookies">Accetta</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('cookieModule', ['cookieConsent']),
  },
  methods: {
    ...mapActions('cookieModule', ['giveCookieConsent']),
    acceptCookies() {
      this.giveCookieConsent();
    },
  },
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 15px 40px 15px 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.cookie-banner button {
  background-color: #db7d12;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cookie-banner button:hover {
  background-color: #c56b10;
}
</style>
