<template>
  <div class="container">
    <ParallaxBackground :showBigBox="false" />
    <router-link to="/" class="home-link">Torna alla Home</router-link>
    <div class="auth-container">
      <h1>{{ isLoginMode ? 'Accedi' : 'Registrati' }}</h1>
      <form @submit.prevent="submit" class="auth-form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input
          v-if="!isLoginMode"
          v-model="username"
          type="text"
          placeholder="Username"
          required
        />
        <button :disabled="loading" class="auth-button">
          {{ loading ? 'Caricamento...' : isLoginMode ? 'Accedi' : 'Registrati' }}
        </button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <p class="toggle-auth">
        <span @click="toggleMode">
          {{ isLoginMode ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ParallaxBackground from '@/components/ParallaxBackground.vue';

export default {
  components: {
    ParallaxBackground,
  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
      isLoginMode: true,
      loading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions('authModule', ['login', 'register']),
    async submit() {
      this.loading = true;
      this.error = null;

      const credentials = { email: this.email, password: this.password };

      try {
        if (this.isLoginMode) {
          await this.$store.dispatch('authModule/login', credentials);
        } else {
          const userData = { ...credentials, username: this.username };
          await this.$store.dispatch('authModule/register', userData);
        }
        this.$router.push('/profile');
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.error = null;
    },
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

.home-link {
  z-index: 50;
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  text-decoration: underline;
  font-size: 16px;
  cursor: pointer;
}

.auth-container {
  position: absolute;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.auth-form input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(90deg, #f59904, #ff781e);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-button:hover {
  transform: scale(1.08);
  box-shadow: 0px 6px 15px rgba(255, 112, 175, 0.5), 0px 6px 15px rgba(255, 218, 68, 0.5);
}

.auth-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
  background: rgba(255, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
}

.toggle-auth span {
  color: #ff7b00;
  cursor: pointer;
  text-decoration: underline;
}
</style>
