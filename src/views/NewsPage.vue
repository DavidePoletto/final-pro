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

    // Funzione per caricare le news dal server su Render
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch('https://server-node.onrender.com/api/gamerpower/news');
        const data = await response.json();

        // Trasforma i dati ricevuti dal server in formato leggibile
        articles.value = data.map(item => ({
          title: item.title,
          description: item.description,
          link: item.open_giveaway_url, // Link per accedere all'offerta
        }));

      } catch (error) {
        console.error('Errore durante il caricamento delle news:', error);
      } finally {
        loading.value = false; // Termina il caricamento
      }
    };

    // Carica i feed dal server quando il componente è montato
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
