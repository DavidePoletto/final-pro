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
        <div v-for="article in articles" :key="article.title" class="news-item">
          <div class="news-image">
            <img :src="article.image_url || 'placeholder.jpg'" alt="News Image" />
            <div class="news-overlay">
              <h2 class="news-title">{{ article.title }}</h2>
              <a :href="article.link" target="_blank" class="read-more">Scopri di più</a>
            </div>
          </div>
        </div>
      </div>
      <button v-if="!loadingMore" @click="loadMoreNews" class="load-more">Carica altre news</button>
      <div v-if="loadingMore" class="loading">Caricamento...</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import MainBar from '@/components/Header.vue';

export default {
  components: {
    MainBar,
  },
  setup() {
    const articles = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    const nextPage = ref('');

    const fetchNews = async (page = '') => {
      try {
        const url = page
          ? `https://server-node-lcxi.onrender.com/api/news/gaming?nextPage=${page}`
          : 'https://server-node-lcxi.onrender.com/api/news/gaming';

        const response = await fetch(url);
        const data = await response.json();

        if (!Array.isArray(data.articles)) {
          throw new Error("Formato dei dati non corretto");
        }

        const newArticles = data.articles.filter(item => !articles.value.some(article => article.title === item.title));
        articles.value = [...articles.value, ...newArticles];
        nextPage.value = data.nextPage || '';
      } catch (error) {
        console.error('Errore durante il caricamento delle news:', error);
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    };

    const loadMoreNews = () => {
      if (nextPage.value) {
        loadingMore.value = true;
        fetchNews(nextPage.value);
      }
    };

    onMounted(() => {
      fetchNews();
    });

    return {
      articles,
      loading,
      loadingMore,
      loadMoreNews,
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
}

.news-container {
  margin-top: 150px;
  max-width: 1300px;
  width: 100%;
  padding: 0 20px;
}

.loading,
.load-more {
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* Colonne con proporzioni uniformi */
  grid-template-rows: repeat(16, 130px); /* Altezza delle righe */
}

.news-item {
  border: 1px solid red;
  position: relative;
  transition: transform 0.3s;
  overflow: hidden;
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
}
.news-item:nth-child(3) {
  grid-column: span 5;
  grid-row: span 2;
}
.news-item:nth-child(4) {
  grid-column: span 5;
  grid-row: span 2;
}
.news-item:nth-child(5) {
  grid-column: span 5;
  grid-row: span 2;
}
.news-item:nth-child(6) {
  grid-column: span 5;
  grid-row: span 2;
}
.news-item:nth-child(7) {
  grid-column: span 5;
  grid-row: span 2;
}

.news-item:nth-child(8) {
  grid-column: span 5;
  grid-row: span 2;
}

.news-item:nth-child(9) {
  grid-column: span 5;
  grid-row: span 2;
}

.news-item:nth-child(10) {
  grid-column: span 5;
  grid-row: span 2;
}

.news-item:nth-child(11) {
  grid-column: span 5;
  grid-row: span 2;
}

.news-item:hover {
  
}

.news-image {
  overflow: hidden;
}

.news-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  display: block;
}

.news-overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
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
</style>
