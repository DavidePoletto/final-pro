<template>
  <div class="container">
    <ParallaxBackground :showBigBox="false" />
    <div class="cart_container">
      <div class="cart">
        <h2>Carrello</h2>
        <div v-if="cartItems.length" class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" alt="Game Cover" class="item-image" />
            <div class="item-details">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-price">€{{ item.price.toFixed(2) }}</p>
              <div class="item-quantity">
                <button @click="decreaseQuantity(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)">+</button>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="empty-cart-message">Il tuo carrello è vuoto.</p>
      </div>
      <div class="summary">
        <h2>Riepilogo Ordine</h2>
        <div class="summary-details">
          <p>Subtotale: €{{ subtotal.toFixed(2) }}</p>
          <p>Spedizione: €0.00</p>
          <hr />
          <p class="total">Totale: €{{ subtotal.toFixed(2) }}</p>
          <button 
            class="checkout-btn" 
            @click="goToCheckout" 
            :disabled="!cartItems.length"
          >
            Procedi al pagamento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ParallaxBackground from '@/components/ParallaxBackground.vue';

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

    const increaseQuantity = (item) => {
      store.commit('addToCart', item);
    };

    const decreaseQuantity = (item) => {
      store.commit('removeFromCart', item.id);
    };

    const goToCheckout = () => {
      if (cartItems.value.length) {
        router.push({ name: 'Checkout' });
      }
    };

    return {
      cartItems,
      subtotal,
      increaseQuantity,
      decreaseQuantity,
      goToCheckout,
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
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  z-index: 5;
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

.cart-items {
  margin-top: 1rem;
}

.cart-item {
  display: flex;
  margin-bottom: 15px;
  color: white;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  font-size: 1.1rem;
}

.item-price {
  font-size: 0.9rem;
  color: #db7d12;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  font-size: 0.8rem;
  color: white;
  background-color: #555;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #777;
}

.summary {
  flex: 1;
  padding: 20px;
  color: white;
  background-color: #444;
  border-radius: 5px;
}

.summary-details {
  margin-top: 1rem;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
}

.checkout-btn {
  width: 100%;
  padding: 10px;
  background-color: #db7d12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.checkout-btn:hover {
  background-color: #c56b10;
}

.checkout-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.empty-cart-message {
  color: #bbb;
  text-align: center;
  font-size: 1.1rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #db7d12;
}

@media (max-width: 768px) {
  .cart_container {
    z-index: 20;
    flex-direction: column;
    padding: 10px;
  }
}
</style>
