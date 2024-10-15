<template>
  <div class="header_container">
  <header class="main-bar">
    <div class="logo_container"><img class="logo" src="../assets/IMG/GAMEVERSE.png" alt="logo"></div>
    <div class="nav_container">
      <ul class="menu">
        <li><a href="">HOME</a></li>
        <li><a href="">STORE</a></li>
        <li><a href="">NEWS</a></li>
        <li><a href="">EVENTS</a></li>
      </ul>
    </div>
    <div class="login_container"></div>
  </header>
  </div>
</template>

<script>
export default {
  name: 'MainBar',
}
</script>

<style>
.header_container {
  width: 100%;
  z-index: 100;
}

.main-bar {
  height: 80px;
  background-color: #323640;
  border-bottom: 2px solid #f07935;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
}

.logo_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.logo {
  width: 60%;
}

.nav_container {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.menu {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  color: white;
}

.menu a {
  text-decoration: none;
  color: white;
  font-weight: 600;
  padding: 5px;
  display: block;
  position: relative;
}

.menu a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #f1752d;
  left: 50%;
  bottom: -1px;
  transform: translateX(-50%);
  transform-origin: center;
  transition: width 0.2s ease-in-out;
}

.menu a:hover::after {
  width: 100%;
}

.login_container {
  flex: 1;
}
</style>
