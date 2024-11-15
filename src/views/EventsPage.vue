<template>
  <div class="Events_page">
    <MainBar />
    <div class="events_container">
      <SwiperComponent />
      <div class="title_box">
        <h1>EVENTI</h1>
      </div>
      <div class="news_section">
        <div class="news_grid">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="news_item"
            :style="{ backgroundImage: `url(${event.image})` }"
            :class="event.class"
          ></div>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script>
import MainBar from '@/components/Header.vue';
import SwiperComponent from '@/components/SwiperComponent.vue';
import MainFooter from '@/components/footer.vue';

// Import delle immagini
import event1 from '@/assets/IMG/eventsIMG/event1.webp';
import event2 from '@/assets/IMG/eventsIMG/event2.webp';
import event3 from '@/assets/IMG/eventsIMG/event3.webp';
import event4 from '@/assets/IMG/eventsIMG/event4.webp';
import event5 from '@/assets/IMG/eventsIMG/event5.webp';
import event6 from '@/assets/IMG/eventsIMG/event6.webp';
import event7 from '@/assets/IMG/eventsIMG/event7.webp';
import event8 from '@/assets/IMG/eventsIMG/event8.webp';
import event9 from '@/assets/IMG/eventsIMG/event9.webp';

export default {
  components: {
    MainBar,
    SwiperComponent,
    MainFooter,
  },
  setup() {
    const events = [
      { image: event1, class: 'one' },
      { image: event2, class: 'two' },
      { image: event3, class: 'three' },
      { image: event4, class: 'four' },
      { image: event5, class: 'five' },
      { image: event6, class: 'six' },
      { image: event7, class: 'seven' },
      { image: event8, class: 'eight' },
      { image: event9, class: 'nine' },
    ];

    return {
      events,
    };
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
  margin-left: 200px;
  color: #fff;
  font-weight: 500;
}

.news_section {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
}

.news_grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(150px, auto);
  gap: 13px;
  margin-bottom: 50px;
}

.news_item {
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, filter 0.2s;
}

.news_item:hover {
  filter: brightness(60%);
  transform: scale(1.03);
}

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

@media (max-width: 1024px) {
  .news_section {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .news_section {
    max-width: 100%;
  }
  .title_box h1 {
    margin: 20px 0 0 0;
  }
  .news_grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .news_item {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .news_section {
    padding: 0;
  }
}
</style>

