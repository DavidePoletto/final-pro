<template>
  <div id="app">
    <CookieConsent />
    <router-view />
  </div>
</template>

<script>
import CookieConsent from '@/components/CookieConsent.vue';
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
  },
}

    
</script>

<style>

</style>
