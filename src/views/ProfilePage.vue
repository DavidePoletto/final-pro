<template>
  <div class="container">
    <ParallaxBackground :showBigBox="false" />
    <div class="profile-container" v-if="user">
      <h1>Profilo di {{ user.username }}</h1>
      <div class="profile-details">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>ID:</strong> {{ user._id }}</p>
      </div>

      <h3>I tuoi ordini</h3>
      <div v-if="orders && orders.length > 0" class="orders-container">
        <div v-for="order in orders" :key="order._id" class="order">
          <p><strong>Ordine ID:</strong> {{ order._id }}</p>
          <p><strong>Totale:</strong> €{{ order.totalPrice.toFixed(2) }}</p>
          <p><strong>Data:</strong> {{ new Date(order.createdAt).toLocaleDateString() }}</p>
          <ul>
            <li v-for="item in order.items" :key="item.gameId">
              {{ item.quantity }} x {{ item.name }} @ €{{ item.price.toFixed(2) }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="loading">
        <p>Caricamento ordini...</p>
      </div>
      <div v-else>
        <p>Nessun ordine trovato.</p>
      </div>

      <button @click="logout" class="logout-button">Esci</button>
      <router-link to="/">
        <button class="home-button">HOME</button>
      </router-link>
    </div>
    <div v-else>
      <p class="no-user">Effettua l'accesso per visualizzare il tuo profilo.</p>
      <router-link to="/login">
        <button class="login-button">Accedi</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ParallaxBackground from '@/components/ParallaxBackground.vue';

export default {
  components: {
    ParallaxBackground,
  },
  computed: {
    ...mapState('orderModule', ['orders', 'loading']), // Corretto namespace
    user() {
      return this.$store.state.authModule.user;
    },
  },
  methods: {
    async fetchOrders() {
      try {
        await this.$store.dispatch('orderModule/fetchOrders'); // Corretto namespace
      } catch (error) {
        console.error('Errore durante il recupero degli ordini:', error);
      }
    },
    logout() {
      this.$store.dispatch('authModule/logout');
      this.$router.push('/login');
    },
  },
  created() {
    if (this.user) {
      this.fetchOrders(); // Carica gli ordini all'accesso
    }
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

.profile-container {
  position: absolute;
  z-index: 50;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.profile-details p,
.orders-container p {
  margin: 5px 0;
}

.orders-container {
  margin-top: 20px;
}

.order {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}

.logout-button,
.home-button,
.login-button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #ff4b5c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  width: 100px;
}

.login-button {
  background-color: #007bff;
}

.no-user {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .profile-container {
    width: 90%;
    padding: 15px;
  }

  h1 {
    font-size: 20px;
  }

  .logout-button,
  .home-button,
  .login-button {
    width: 100%;
  }
}
</style>
