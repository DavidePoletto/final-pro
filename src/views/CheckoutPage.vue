<template>
  <div class="container">
    <ParallaxBackground :showBigBox="false" />
    <div class="checkout-container">
      <h2>Pagamento</h2>
      <div class="order-summary">
        <h3>Riepilogo Ordine</h3>
        <div v-for="item in cartItems" :key="item.id" class="order-item">
          <img :src="item.image" alt="Game Cover" class="item-image" />
          <div class="item-details">
            <p class="item-title">{{ item.name }}</p>
            <p>Prezzo: €{{ item.price.toFixed(2) }}</p>
            <p>Quantità: {{ item.quantity }}</p>
          </div>
        </div>
        <p>Subtotale: €{{ subtotal.toFixed(2) }}</p>
        <p>Spedizione: €0.00</p>
        <hr />
        <p class="total">Totale: €{{ subtotal.toFixed(2) }}</p>
      </div>

      <form class="payment-form" @submit.prevent="processPayment">
        <h3>Informazioni Spedizione</h3>
        <div class="form-group">
          <label for="name">Nome e Cognome</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="city">Città</label>
          <input type="text" id="city" v-model="city" required />
        </div>
        <div class="form-group">
          <label for="postalCode">CAP</label>
          <input type="text" id="postalCode" v-model="postalCode" required />
        </div>
        <div class="form-group">
          <label for="address">Via</label>
          <input type="text" id="address" v-model="address" required />
        </div>

        <h3>Informazioni Carta</h3>
        <div class="form-group">
          <label for="cardNumber">Numero Carta</label>
          <input type="text" id="cardNumber" v-model="cardNumber" required maxlength="16" />
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
            @input="formatExpiryDate"
          />
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" v-model="cvv" required maxlength="3" />
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
import { useRouter } from 'vue-router';

export default {
  components: {
    ParallaxBackground,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const cartItems = computed(() => store.getters.cartItems);
    const subtotal = computed(() =>
      cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const name = ref('');
    const city = ref('');
    const postalCode = ref('');
    const address = ref('');
    const cardNumber = ref('');
    const expiryDate = ref('');
    const cvv = ref('');

    const formatExpiryDate = () => {
      if (!expiryDate.value) return;

      // Rimuove i caratteri non numerici
      let cleaned = expiryDate.value.replace(/\D/g, '');

      // Inserisce lo '/' al secondo carattere
      if (cleaned.length > 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }

      // Limita il valore massimo a 5 caratteri (MM/AA)
      expiryDate.value = cleaned.slice(0, 5);
    };

    const validatePaymentInfo = () => {
      return (
        cardNumber.value.length === 16 &&
        /^[0-9]{2}\/[0-9]{2}$/.test(expiryDate.value) &&
        cvv.value.length === 3
      );
    };

    const processPayment = async () => {
      if (!validatePaymentInfo()) {
        alert('Si prega di controllare i dati della carta.');
        return;
      }

      try {
        const orderData = {
          items: cartItems.value.map((item) => ({
            gameId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          totalPrice: subtotal.value,
          shippingAddress: {
            name: name.value,
            address: address.value,
            city: city.value,
            postalCode: postalCode.value,
          },
        };

        await store.dispatch('orderModule/createOrder', orderData);
        store.commit('clearCart');
        router.push('/profile');
      } catch (error) {
        alert('Errore durante il pagamento. Riprova più tardi.');
        console.error('Errore pagamento:', error);
      }
    };

    return {
      cartItems,
      subtotal,
      name,
      city,
      postalCode,
      address,
      cardNumber,
      expiryDate,
      cvv,
      formatExpiryDate,
      validatePaymentInfo,
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

.order-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.item-image {
  width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
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
  width: 96%;
  padding: 10px;
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
