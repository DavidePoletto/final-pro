<template>
    <div class="container">
      <ParallaxBackground :showBigBox="false" />
    </div>
    <img class="goback" src="@/assets/IMG/back1.png" alt="gobackimg" @click="goBack">
    <div class="login_container">
      <img class="logo" src="@/assets/IMG/GAmeverse1.png" alt="logo">
      <h2>{{ isLogin ? "Login" : "Registrazione" }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input
          v-if="!isLogin"
          type="password"
          v-model="confirmPassword"
          placeholder="Conferma Password"
          required
        />
        <button type="submit">{{ isLogin ? "Accedi" : "Registrati" }}</button>
      </form>
      <p class="toggle_register">
        {{ isLogin ? "Non hai un account?" : "Hai già un account?" }}
        <span @click="toggleMode">{{ isLogin ? "Registrati" : "Accedi" }}</span>
      </p>
    </div>
</template>
  
<script>
  import ParallaxBackground from '@/components/ParallaxBackground.vue';
  import { ref } from 'vue';
  
  export default {
    components: {
      ParallaxBackground,
    },
    setup() {
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const isLogin = ref(true);
  
      const handleSubmit = () => {
        if (!isLogin.value && password.value !== confirmPassword.value) {
          alert("Le password non coincidono.");
          return;
        }
        alert(isLogin.value ? 'Login eseguito' : 'Registrazione eseguita');
      };
  
      const toggleMode = () => {
        isLogin.value = !isLogin.value;
      };
  
      const goBack = () => {
        window.history.back();
      };
  
      return {
        email,
        password,
        confirmPassword,
        isLogin,
        handleSubmit,
        toggleMode,
        goBack,
      };
    },
  };
</script>
  
<style scoped>
  .container {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  
  .goback {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 20;
    width: 50px;
    cursor: pointer;
  }
  
  .login_container {
    width: 40vh;
    max-width: 50%;
    height: 60vh;
    padding: 2rem;
    border-radius: 10px;
    background-color: #2d2b2b;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 3;
  }
  
  .logo {
    position: relative;
    width: 80%;
    top: 0;
  }
  
  h2 {
    margin-top: 60px;
    margin-bottom: 1.5rem;
  }
  
  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  
  input {
    width: 70%;
    border: none;
    padding: 5px 5px 0px 5px;
    border-bottom: 2px solid rgb(117, 117, 117);
    outline: none;
    background: none;
    font-size: 1rem;
    color: white;
    font-size: large;
  }
  
  button {
    margin-top: 20px;
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #db7d12;
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .toggle_register {
    margin-top: 10%;
    font-size: 0.9rem;
  }
  
  .toggle_register span {
    color: #db7d12;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
  
  