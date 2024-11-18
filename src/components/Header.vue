<template>
  <div class="logo_container">
    <img class="logo" src="../assets/IMG/icons/GAmeverse1.webp" alt="logo">
  </div>
  <div class="header_container" :class="{ 'scrolled': isScrolled }">
    <header class="main_bar">
      <div class="menu">
        <div><router-link to="/">HOME</router-link></div>
        <div><router-link to="/ShopPage">SHOP</router-link></div>
        <div><router-link to="/NewsPage">NEWS</router-link></div>
        <div><router-link to="/EventsPage">EVENTS</router-link></div>
      </div>
    </header>
  </div>

  <div class="header_smartphone" :class="{ 'scrolled': isScrolled }">
    <div class="hamburger_icon" @click="toggleMobileMenu">
      {{ isMobileMenuOpen ? '✕' : '☰' }}
    </div>
    <div class="mobile_menu" v-show="isMobileMenuOpen">
      <div><router-link to="/" @click="closeMobileMenu">HOME</router-link></div>
      <div><router-link to="/ShopPage" @click="closeMobileMenu">SHOP</router-link></div>
      <div><router-link to="/NewsPage" @click="closeMobileMenu">NEWS</router-link></div>
      <div><router-link to="/EventsPage" @click="closeMobileMenu">EVENTI</router-link></div>
      <router-link to="/CartPage" @click="closeMobileMenu">
        <img class="cart_in_menu" src="../assets/IMG/icons/cart.webp" alt="cart icon">
      </router-link>
      <div class="auth-link">
        <router-link v-if="!isAuthenticated" to="/login" @click="closeMobileMenu">Accedi</router-link>
        <router-link v-else to="/profile" @click="closeMobileMenu">{{ user?.username || 'Profilo' }}</router-link>
      </div>
    </div>
  </div>

  <div class="cart_container">
    <router-link to="/CartPage">
      <img class="cart" src="../assets/IMG/icons/cart.webp" alt="icon">
    </router-link>
    <router-link v-if="!isAuthenticated" to="/login">Accedi</router-link>
    <router-link v-else to="/profile">{{ user?.username || 'Profilo' }}</router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MainBar',
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const store = useStore();

    // Calcolare se l'utente è autenticato
    const isAuthenticated = computed(() => store.getters['authModule/isAuthenticated']);
    // Ottieni l'utente dal Vuex store
    const user = computed(() => store.getters['authModule/user']);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 100;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      isAuthenticated,
      user,
    };
  },
};
</script>

<style scoped>
.header_container {
  width: 30%;
  position: fixed;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  transition: width 0.3s ease-out, background-color 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
}

.header_container.scrolled {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  margin-top: 0;
  border-radius: 0;
}

.main_bar {
  height: 80px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
}

.header_container.scrolled .main_bar {
  background-color: transparent;
}

.logo_container {
  position: fixed;
  z-index: 200;
  width: 200px;
  left: 40px;
  top: 10px;
}

.logo {
  width: 100%;
}

.menu {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu div {
  border-radius: 100px;
  color: #fff;
  display: flex;
  margin: 0 5px;
  padding: 13px 15px;
}

.menu a {
  color: white;
  font-weight: 500;
  text-decoration: none;
  padding: 10px;
}

.cart_container {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  position: fixed;
  z-index: 200;
  top: 20px;
  right: 10px;
}

.cart_container a {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}

.cart {
  width: 40px;
}

.auth-link {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.auth-link a {
  color: white;
  text-decoration: none;
  text-transform: uppercase;
}

.auth-link a:hover {
  text-decoration: underline;
}

.hamburger_icon {
  display: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  padding: 10px;
}

.mobile_menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: white;
  font-size: 1.5rem;
}

.mobile_menu a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.close_menu {
  font-size: 2rem;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: white;
}

.cart_in_menu {
  width: 40px;
  margin-top: 20px;
  display: none;
}

.user-dropdown {
  position: relative;
}

.user-name {
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 1000;
}

.dropdown-menu span {
  cursor: pointer;
}

@media (max-width: 768px) {

  .logo_container {
    width: 40%;
    left: 10px;
  }

  .header_container {
    display: none;
  }

  .menu {
    display: none;
  }

  .hamburger_icon {
    display: block;
    padding: 10px;
    margin-right: 10px;
    z-index: 50;
  }

  .cart_container {
    display: none;
  }

  .mobile_menu .cart_in_menu {
    display: block;
  }

  .header_smartphone {
    position: fixed;
    z-index: 20;
    width: 100%;
    display: flex;
    justify-content: end;
    transition: 0.3s;
  }

  .header_smartphone.scrolled {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    border-radius: 0;
  }
  
}
</style>

