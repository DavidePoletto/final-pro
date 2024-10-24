<template>
  <div class="Events_page">
    <MainBar />
    <div class="events_container">
      <SwiperComponent />
      <div class="title_box">
        <h1>Events ></h1>
      </div>
      <div class="news_section">
        <div class="news_grid">
          <div class="news_item one">1</div>
          <div class="news_item two">2</div>
          <div class="news_item three">3</div>
          <div class="news_item four">4</div>
          <div class="news_item five">5</div>
          <div class="news_item six"> 6</div>
          <div class="news_item seven">7</div>
          <div class="news_item eight">8</div>
          <div class="news_item nine">9</div>
        </div>
      </div>
    </div>
    <MainFooter/>
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import SwiperComponent from '@/components/SwiperComponent.vue';
import MainFooter from '@/components/footer.vue'

export default {
  components: {
    MainBar,
    SwiperComponent,
    MainFooter,
  },
};
</script>

<style scoped>
.Events_page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #333;
}

.events_container {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news_section {
  margin-top: 20px; /* Spazio sotto lo swiper */
  padding: 20px;
  background-color: #f9f9f9; /* Colore di sfondo della sezione notizie */
  background-color: #333;
}

.news_grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Colonne flessibili */
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 10px; /* Spazio tra i box */
}

.news_item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Dimensioni diverse per i box */
.news_item.one {
  grid-column: span 2;
  grid-row: span 3;
}

.news_item.two {
  grid-column: span 4;
  grid-row: span 2;
}

.news_item.three {
  grid-column: span 1;
  grid-row: span 2;
}

.news_item.four {
  grid-column: span 3;
  grid-row: span 4;
}

.news_item.five {
  grid-column: span 2;
  grid-row: span 1;
}

.news_item.six {
  grid-column: span 3;
  grid-row: span 2;
}

.news_item.seven {
  grid-column: span 6;
  grid-row: span 2;
}

.news_item.eight {
  grid-column: span 3;
  grid-row: span 1;
}

.news_item.nine {
  grid-column: span 3;
  grid-row: span 1;
}
</style>

