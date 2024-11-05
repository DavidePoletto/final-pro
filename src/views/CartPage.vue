<template>
  <div class="container">
    <ParallaxBackground :showBigBox="false" />
    <div class="cart_container">
      <div class="cart">
        <h2>Carrello</h2>
        <p>Articolo 1 - €20.00</p>
        <p>Articolo 2 - €15.00</p>
        <!-- Aggiungi più articoli o usa un ciclo v-for per generare elementi dinamici -->
      </div>
      <div class="summary">
        <h2>Riepilogo Ordine</h2>
        <p>Totale parziale: €35.00</p>
        <p>Spedizione: €5.00</p>
        <p><strong>Totale: €40.00</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
import ParallaxBackground from '@/components/ParallaxBackground.vue';

export default {
  components: {
    ParallaxBackground,
  },
  setup() {
    const goBack = () => {
      window.history.back();
    };
    return {
      goBack,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.cart_container {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  height: 60vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

.cart {
  flex: 2;
  padding: 20px;
  color: white;
  background-color: #333;
  border-radius: 5px;
}

.summary {
  flex: 1;
  padding: 20px;
  color: white;
  background-color: #444;
  border-radius: 5px;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #db7d12; /* Colore arancione per risaltare */
}

.goback {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 20;
  width: 50px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .cart_container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 95%;
  }
  .cart, .summary {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>

  