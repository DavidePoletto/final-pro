<template>
  <div class="Events_page">
    <MainBar />
    <div class="events_container">
      <SwiperComponent />
      <div class="title_box">
        <h1>Events</h1>
      </div>
      <div class="news_section">
        <div class="news_grid">
          <div class="news_item one"></div>
          <div class="news_item two"></div>
          <div class="news_item three"></div>
          <div class="news_item four"></div>
          <div class="news_item five"></div>
          <div class="news_item six"> </div>
          <div class="news_item seven"></div>
          <div class="news_item eight"></div>
          <div class="news_item nine"></div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #333;
}

.title_box h1 {
  display: flex;
  margin-left: 200px;
  color: #fff;
  font-weight: 500;
}

.news_section {
  max-width: 1600px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

.news_grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 13px;
  margin-bottom: 50px;
}

.news_item {
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;
}

.news_item:hover {
  filter: brightness(60%);
  transform: scale(1.03);

}

/* Dimensioni diverse per i box */
.news_item.one {
  background-image: url(../assets/IMG/eventsIMG/event1.jpg);
  background-size: cover;
  grid-column: span 2;
  grid-row: span 3;
}

.news_item.two {
  background-image: url(../assets/IMG/eventsIMG/event2.jpg);
  background-position: center;
  background-size: cover;
  grid-column: span 4;
  grid-row: span 2;
}

.news_item.three {
  background-image: url(../assets/IMG/eventsIMG/event3.jpg);
  background-position: center;
  background-size: cover;
  grid-column: span 1;
  grid-row: span 2;
}

.news_item.four {
  background-image: url(../assets/IMG/eventsIMG/event4.jpg);
  background-position: center;
  grid-column: span 3;
  grid-row: span 4;
}

.news_item.five {
  background-image: url(../assets/IMG/eventsIMG/event5.jpg);
  background-position: center;
  background-size: cover;
  grid-column: span 2;
  grid-row: span 1;
}

.news_item.six {
  background-image: url(../assets/IMG/eventsIMG/event6.jpg);
  background-position: center;
  background-size: cover;
  grid-column: span 3;
  grid-row: span 2;
}

.news_item.seven {
  background-image: url(../assets/IMG/eventsIMG/event7.jpg);
  background-position: center;
  background-size: cover;
  grid-column: span 6;
  grid-row: span 2;
}

.news_item.eight {
  background-image: url(../assets/IMG/eventsIMG/event8.jpg);
  background-position: center;
  background-size: cover;
  grid-column: span 3;
  grid-row: span 1;
}

.news_item.nine {
  background-image: url(../assets/IMG/eventsIMG/event9.png);
  background-position: center;
  background-size: cover;
  grid-column: span 3;
  grid-row: span 1;
}

@media (max-width: 1200px) {
  .news_section {
    max-width: 90%; /* Riduci la larghezza massima al 90% della viewport quando la larghezza dello schermo è inferiore a 1200px */
    padding: 0 10px; /* Riduci leggermente il padding */
  }
}

@media (max-width: 768px) {
  .news_section {
    max-width: 100%; /* Rendi la sezione piena larghezza su schermi piccoli */
    padding: 0 5px; /* Riduci ancora di più il padding */
  }
}

@media (max-width: 576px) {
  .news_section {
    max-width: 100%; /* Larghezza massima 100% su schermi piccoli */
    padding: 0; /* Elimina il padding per occupare l'intera larghezza */
  }
}
</style>

