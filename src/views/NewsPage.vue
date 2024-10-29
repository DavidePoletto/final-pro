<template>
  <div class="news-page">
    <MainBar />
    <div class="news-container">
      <div v-if="loading" class="loading">Caricamento delle news...</div>
      <div v-else class="news-grid">
        <div class="big-news">
          <h2>Notizia in evidenza</h2>
          <p>Questa è la notizia in evidenza, visualizzata come primo elemento.</p>
        </div>

        <div v-for="(item, index) in displayItems" :key="index" :class="{ 'news-item': !item.isSeparator, 'separator-div': item.isSeparator }">
          <template v-if="!item.isSeparator">
            <div class="news-image">
              <img :src="item.image_url || 'placeholder.jpg'" alt="News Image" />
            </div>
            <div class="news-overlay">
              <h2 class="news-title">{{ item.title }}</h2>
              <a :href="item.link" target="_blank" class="read-more">Scopri di più</a>
            </div>
          </template>
          <template v-else>
            <div class="separator-content">
              <p>{{ item.content }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MainFooter from '@/components/footer.vue';
import MainBar from '@/components/Header.vue';

export default {
  components: {
    MainBar,
    MainFooter,
  },
  setup() {
    const store = useStore();

    // Ottieni le notizie da Vuex
    const articles = computed(() => store.getters.allNews);
    const loading = computed(() => articles.value.length === 0);

    // Carica le notizie al montaggio, se necessario
    onMounted(() => {
      if (loading.value) {
        store.dispatch('fetchNews');
      }
    });

    const displayItems = computed(() => {
      const items = [];
      articles.value.forEach((article, index) => {
        items.push(article);
        if ((index + 1) % 3 === 0) {
          items.push({ isSeparator: true, content: 'Contenuto separatore' });
        }
      });
      return items;
    });

    return {
      loading,
      displayItems,
    };
  },
};
</script>


<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111;
  color: #fff;
  background-image: url(@/assets/IMG/newsbackground1.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
}

.news-container {
  margin-top: 150px;
  max-width: 1300px;
  width: 100%;
  padding: 0 20px;
  height: 100%;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(16, 130px);
  grid-auto-flow: dense;
  margin-bottom: 100px;
}

.news-item {
  border: 1px solid red;
  position: relative;
  display: flex;
}

.big-news {
  grid-column: span 10;
  grid-row: span 4;
  background-color: #222;
  color: #fff;
  padding: 20px;
}

.news-item:nth-child(2) {
  grid-column: span 5;
  grid-row: span 4;
  display: flex;
  position: relative;
}

.news-item:nth-child(2) .news-overlay {
  position: absolute;
}

.news-item:nth-child(2) .news-image {
  width: 100%;
}


.news-item:nth-child(3),
.news-item:nth-child(4),
.news-item:nth-child(5),
.news-item:nth-child(6),
.news-item:nth-child(7),
.news-item:nth-child(8),
.news-item:nth-child(9),
.news-item:nth-child(10),
.news-item:nth-child(11),
.news-item:nth-child(12),
.news-item:nth-child(13),
.news-item:nth-child(14),
.news-item:nth-child(15) {
  grid-column: span 5;
  grid-row: span 2;
}

.news-image {
  height: 100%;
  width: 50%;
}

.news-image img {
  width: 100%;
  height: 100%;
}

.news-overlay {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: white;
  color: #000000;
  transition: opacity 0.3s;
  width: 50%;
}

.news-item:hover .news-overlay {
  opacity: 1;
}

.news-title {
  font-size: 1.2em;
  font-weight: bold;
  max-width: 200px;
}

.read-more {
  color: #ffcc00;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.read-more:hover {
  color: #ffdd57;
}

.separator-div {
  background-color: #333;
  color: #fff;
  text-align: center;
  grid-column: 1 / -1;
}

.loading {
  display: flex;
  justify-content: center;
}

.load-more {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>