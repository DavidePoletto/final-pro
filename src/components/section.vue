<template>
    <div class="section_container">
      <h2>{{ title }}</h2>
      <div class="game_list">
        <div v-for="game in games" :key="game.id" class="game_card">
          <div class="image_wrapper">
            <img :src="game.background_image" :alt="game.name" />
          </div>
          <div class="game_info">
            <h2>{{ game.name }}</h2>
            <p>€{{ game.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      games: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .section_container {
    margin: 50px 0;
  }
  
  .section_container h2 {
    color: white;
    text-align: center;
  }
  
  .game_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .game_card {
    display: flex;
    flex-direction: column;
    margin: 15px;
    min-width: 0;
    position: relative;
    width: calc(33.33333% - 30px);
    transition: transform 0.3s ease;
  }
  
  .game_card:hover {
    transform: scale(1.05);
  }
  
  .image_wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    overflow: hidden;
    border-radius: 10px;
  }
  
  .image_wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .game_info {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  .game_info h2, .game_info p {
    color: white;
  }
  </style>
  