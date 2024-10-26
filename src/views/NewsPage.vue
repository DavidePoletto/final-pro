<template>
  <div class="news-page">
    <MainBar />
    <div class="news-container">
      <h1 class="page-title">Notizie sul Gaming</h1>
      <div v-if="loading" class="loading">Caricamento delle news...</div>
      <div v-else class="news-grid">
        <div v-for="article in articles" :key="article.title" class="news-item">
          <div class="news-image">
            <img :src="article.image_url || 'placeholder.jpg'" alt="News Image" />
            <div class="news-overlay">
              <h2 class="news-title">{{ article.title }}</h2>
              <a :href="article.link" target="_blank" class="read-more">Scopri di più</a>
            </div>
          </div>
        </div>
        <button v-if="!loadingMore" @click="loadMoreNews" class="load-more">Carica altre news</button>
        <div v-if="loadingMore" class="loading">Caricamento...</div>
      </div>
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
    const nextPage = ref(''); // Mantiene il valore di `nextPage`

    const fetchNews = async (page = '') => {
      try {
        // Costruisce la URL in base alla presenza di `nextPage`
        const url = page
          ? `https://server-node-lcxi.onrender.com/api/news/gaming?nextPage=${page}`
          : 'https://server-node-lcxi.onrender.com/api/news/gaming';
          
        const response = await fetch(url);
        const data = await response.json();

        if (!Array.isArray(data.articles)) {
          throw new Error("Formato dei dati non corretto");
        }

        // Aggiungi nuovi articoli evitando duplicati
        const newArticles = data.articles.filter(item => !articles.value.some(article => article.title === item.title));
        articles.value = [...articles.value, ...newArticles];
        
        // Aggiorna `nextPage` solo se presente
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
        fetchNews(nextPage.value); // Usa `nextPage` come parametro solo se presente
      }
    };

    onMounted(() => {
      fetchNews(); // Carica la prima pagina
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
  min-height: 100vh;
  padding: 20px;
}

.page-title {
  font-size: 2.5em;
  color: #ffcc00;
  margin: 20px 0;
  text-align: center;
}

.news-container {
  width: 100%;
  max-width: 1200px;
}

.loading {
  font-size: 1.5em;
  color: #ffcc00;
  text-align: center;
  padding: 50px 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.news-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s;
}

.news-item:hover {
  transform: scale(1.05);
}

.news-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.news-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px;
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
  margin-bottom: 10px;
}

.read-more {
  color: #ffcc00;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
  transition: color 0.3s;
}

.read-more:hover {
  color: #ffdd57;
}
</style>



