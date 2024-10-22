<template>
  <div class="News_page">
    <MainBar />
    <h1>Notizie sui Videogiochi</h1>
    <div v-if="loading">Caricamento delle news...</div>
    <div v-else>
      <div v-for="article in articles" :key="article.title" class="news-article">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <a :href="article.link" target="_blank">Leggi di più</a>
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
    const articles = ref([]); // Array di articoli
    const loading = ref(true); // Stato di caricamento

    // Funzione per caricare le news dai feed RSS
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.polygon.com/rss/index.xml');
        const data = await response.text();

        // Converte XML in DOMParser per estrarre informazioni
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'text/xml');
        const items = xml.querySelectorAll('item');

        // Estrai titolo, descrizione e link di ogni articolo
        articles.value = Array.from(items).map(item => ({
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          link: item.querySelector('link').textContent,
        }));

      } catch (error) {
        console.error('Errore durante il caricamento del feed RSS:', error);
      } finally {
        loading.value = false; // Termina il caricamento
      }
    };

    // Carica i feed RSS quando il componente è montato
    onMounted(() => {
      fetchRSSFeed();
    });

    return {
      articles,
      loading,
    };
  },
};
</script>

<style scoped>
.News_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.news-article {
  margin-bottom: 20px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
}

.news-article h2 {
  color: #333;
  margin-bottom: 10px;
}

.news-article p {
  color: #666;
}

.news-article a {
  color: #007BFF;
  text-decoration: none;
}
</style>
