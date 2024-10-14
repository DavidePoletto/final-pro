<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  height: 100vh; /* Fa sì che l'app copra l'intera altezza della finestra */
}

body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
