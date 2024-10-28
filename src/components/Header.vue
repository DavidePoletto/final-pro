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
  setup() {
    const isScrolled = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 100;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
    };
  }
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

