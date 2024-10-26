<template>
  <div class="logo_container">
    <img class="logo" src="../assets/IMG/GAmeverse1.png" alt="logo">
  </div>
  <div class="header_container" :class="{ 'scrolled': isScrolled }">
    <header class="main_bar">
      <div class="menu">
        <div><router-link to="/">HOME</router-link></div>
        <div><router-link to="/ShopPage">SHOP</router-link></div>
        <div><router-link to="/NewsPage">NEWS</router-link></div>
        <div><router-link to="/EventsPage">EVENTS</router-link></div>
        <div class="search_container">
          <!-- Icona della lente -->
          <img class="search_icon" src="../assets/IMG/search.png" @click="toggleSearch">
          <!-- Campo di ricerca -->
          <input 
            v-if="isSearchOpen" 
            v-model="searchQuery" 
            type="text" 
            class="search_box" 
            placeholder="Destiny, GDR, Co-op,..." 
            @keyup.enter="searchGames"
            @blur="closeSearch" 
          />
        </div>
      </div>
    </header>
  </div>
  <div class="cart_container">
    <router-link to="/CartPage"><img class="cart" src="../assets/IMG/cart.png" alt="icon"></router-link>
    <router-link to="/LoginPage"><img class="login" src="../assets/IMG/login.png" alt="icon"></router-link>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'MainBar',
  emits: ['search'], // Evento che verrà emesso al genitore
  setup(props, { emit }) {
    const isScrolled = ref(false);
    const isSearchOpen = ref(false);
    const searchQuery = ref(''); // Salva il valore della barra di ricerca

    // Funzione per gestire lo scroll
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 100;
    };

    // Funzione per aprire e chiudere la barra di ricerca
    const toggleSearch = () => {
      isSearchOpen.value = !isSearchOpen.value;
    };

    const closeSearch = () => {
      isSearchOpen.value = false;
    };

    // Emette l'evento per la ricerca dei giochi
    const searchGames = () => {
      emit('search', searchQuery.value);
    };

    // Aggiunge l'evento scroll quando il componente è montato
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    // Rimuove l'evento scroll quando il componente viene smontato
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
      isSearchOpen,
      searchQuery,
      toggleSearch,
      closeSearch,
      searchGames,
    };
  }
};
</script>

<style scoped>
/* Lo stile del tuo header rimane invariato */
.header_container {
  width: 30%;
  position: fixed;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  transition: width 0.2s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_container.scrolled {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  margin-top: 0;
  border-radius: 0px;
}

.main_bar {
  height: 80px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
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

.search_container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: #fff;
  width: 38px;
}

.search_icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  z-index: 20;
}

.search_box {
  position: absolute;
  right: 0;
  width: 0;
  height: 70px;
  padding: 0;
  border: none;
  border-radius: 5px;
  transition: width 0.2s ease-in;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 500;
}

.search_box:focus {
  outline: none;
}

.search_container:hover .search_box {
  width: 481px;
  padding: 5px 10px;
  height: 60px;
  border-radius: 50px;
  text-indent: 20px;
  background-color: #ffffff;
}

.search_box::placeholder {
  color: #ff9500;
  opacity: 0.6;
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

.login {
  width: 60px;
}

.cart {
  width: 40px;
}
</style>
