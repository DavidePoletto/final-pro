<template>
  <div class="container">
    <ParallaxBackground :showBigBox="false" />
    <div class="checkout-container">
      <h2>Pagamento</h2>
      <div class="order-summary">
        <h3>Riepilogo Ordine</h3>
        <p>Subtotale: €{{ subtotal.toFixed(2) }}</p>
        <p>Spedizione: €0.00</p>
        <hr />
        <p class="total">Totale: €{{ subtotal.toFixed(2) }}</p>
      </div>

      <form class="payment-form" @submit.prevent="processPayment">
        <h3>Informazioni Spedizione</h3>

        <div class="form-group">
          <label for="name">Nome e Cognome</label>
          <input type="text" id="name" v-model="name" required aria-label="Nome e Cognome" />
        </div>

        <div class="form-group">
          <label for="city">Città</label>
          <input type="text" id="city" v-model="city" required aria-label="Città" />
        </div>

        <div class="form-group">
          <label for="postalCode">CAP</label>
          <input type="text" id="postalCode" v-model="postalCode" required aria-label="CAP" />
        </div>

        <div class="form-group">
          <label for="address">Via</label>
          <input type="text" id="address" v-model="address" required aria-label="Indirizzo" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required aria-label="Email" />
        </div>

        <h3>Informazioni Carta</h3>

        <div class="form-group">
          <label for="cardNumber">Numero di Carta</label>
          <input type="text" id="cardNumber" v-model="cardNumber" required maxlength="16" aria-label="Numero di Carta" />
        </div>

        <div class="form-group">
          <label for="expiryDate">Data di Scadenza</label>
          <input
            type="text"
            id="expiryDate"
            v-model="expiryDate"
            required
            placeholder="MM/AA"
            maxlength="5"
            aria-label="Data di Scadenza"
          />
        </div>

        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" v-model="cvv" required maxlength="3" aria-label="CVV" />
        </div>

        <button type="submit" class="submit-btn">Completa il pagamento</button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ParallaxBackground from '@/components/ParallaxBackground.vue';

export default {
  components: {
    ParallaxBackground,
  },
  setup() {
    const store = useStore();
    const subtotal = computed(() => {
      const items = store.getters.cartItems || [];
      return items.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
    });

    const name = ref('');
    const city = ref('');
    const postalCode = ref('');
    const address = ref('');
    const email = ref('');
    const cardNumber = ref('');
    const expiryDate = ref('');
    const cvv = ref('');

    const processPayment = () => {
      if (validatePaymentInfo()) {
        alert('Pagamento completato con successo!');
      } else {
        alert('Si prega di controllare i dati della carta.');
      }
    };

    const validatePaymentInfo = () => {
      return (
        cardNumber.value.length === 16 &&
        /^[0-9]{2}\/[0-9]{2}$/.test(expiryDate.value) &&
        cvv.value.length === 3
      );
    };

    return {
      subtotal,
      name,
      city,
      postalCode,
      address,
      email,
      cardNumber,
      expiryDate,
      cvv,
      processPayment,
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

.checkout-container {
  position: absolute;
  z-index: 20;
  width: 90%;
  max-width: 500px;
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  max-height: 90vh;
}

.order-summary {
  margin-bottom: 15px;
  font-size: 1rem;
}

.payment-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px 0 10px 0;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
}

input::placeholder {
  color: #bbb;
}

.submit-btn {
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #db7d12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #c56b10;
}

.total {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .checkout-container {
    max-width: 90%;
    padding: 15px;
  }
}
</style>
