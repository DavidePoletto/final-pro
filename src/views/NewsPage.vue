<template>
  <div class="news-page">
    <MainBar />
    <div class="news-container">
      <div v-if="isLoadingNews" class="loading">Caricamento delle news...</div>
      <div v-else-if="newsError" class="error">
        <p>Errore nel caricamento delle notizie: {{ newsError }}</p>
      </div>
      <div v-else class="news-grid">
        <div
          class="big-news"
          @click="toggleOverlay(-1)"
          :class="{ active: activeIndex === -1 }"
        >
          <div class="big-image"></div>
          <div class="big-newscontent">
            <h2>Destiny 2: Un’Opera d’Arte senza Tempo, il Gioco Definitivo</h2>
            <h3>
              <em
                >Metacritic: “Non solo il miglior gioco mai creato, ma un
                capolavoro insuperabile che non potrà mai essere
                eguagliato.”</em
              >
            </h3>
            <p>
              <a
                href="https://www.spaziogames.it/notizie/destiny-2-e-diventato-il-miglior-gioco-del-2024-su-metacritic"
                target="_blank"
              >
                Scopri di più
              </a>
            </p>
          </div>
        </div>

        <div
          v-for="(item, index) in articlesWithFallback"
          :key="index"
          class="news-item"
        >
          <div class="news-image">
            <img :src="item.image_url" alt="News Image" />
          </div>
          <div
            class="news-overlay"
            @click="toggleOverlay(index)"
            :class="{ active: activeIndex === index }"
          >
            <h2 class="news-title">{{ item.title }}</h2>
            <a :href="item.link" target="_blank" class="read-more">Scopri di più</a>
          </div>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import MainFooter from "@/components/footer.vue";
import MainBar from "@/components/Header.vue";

export default {
  components: {
    MainBar,
    MainFooter,
  },
  setup() {
    const store = useStore();
    const activeIndex = ref(null);

    const isLoadingNews = computed(() => store.getters.isLoading("news"));
    const newsError = computed(() => store.getters.getError("news"));
    const articles = computed(() => store.getters.allNews || []);

    const articlesWithFallback = computed(() =>
      articles.value.map((article) => ({
        ...article,
        image_url: article.image_url || "placeholder.jpg",
      }))
    );

    const toggleOverlay = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    onMounted(() => {
      if (!articles.value.length) {
        store.dispatch("fetchNews");
      }
    });

    return {
      isLoadingNews,
      newsError,
      articlesWithFallback,
      activeIndex,
      toggleOverlay,
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
  background-image: url(@/assets/IMG/backgrounds/newsbackground6.jpg);
  background-size: cover;
  height: 100%;
}

.news-container {
  margin-top: 150px;
  max-width: 1300px;
  width: 100%;
  padding: 0 20px;
  height: 100%;
  min-height: 80vh;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(16, 130px);
  grid-auto-flow: dense;
  gap: 10px;
  margin-bottom: 100px;
}

.big-news {
  grid-column: span 12;
  grid-row: span 5;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.big-image {
  background-image: url('@/assets/IMG/destinygoty.webp');
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  object-fit: cover;
}

.big-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.big-news a:link,
.big-news a:visited {
  color: #ffcc00;
}

.big-newscontent {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  transition: opacity 0.3s;
  opacity: 0;
  height: 100%;
  text-decoration: none;
}

.big-newscontent:hover {
  opacity: 1;
}

.big-news.active .big-newscontent {
  opacity: 1;
}

.news-item:nth-child(2) {
  grid-column: span 6;
  grid-row: span 4;
}

.news-item:nth-child(3),
.news-item:nth-child(4) {
  grid-column: span 6;
  grid-row: span 2;
}

.news-item:nth-child(5) {
  grid-column: span 6;
  grid-row: span 2;
}

.news-item:nth-child(6),
.news-item:nth-child(7) {
  grid-column: span 3;
  grid-row: span 2;
}

.news-item:nth-child(8) {
  grid-column: span 12;
  grid-row: span 3;
}

.news-item:nth-child(9),
.news-item:nth-child(10),
.news-item:nth-child(11) {
  grid-column: span 4;
  grid-row: span 3;
}

.news-item {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.news-image {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  transition: opacity 0.3s;
  opacity: 0;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.news-item:hover .news-overlay {
  opacity: 1;
}

.news-item.active .news-overlay {
  opacity: 1;
}

.news-title {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

.read-more {
  color: #ffcc00;
  font-weight: bold;
}

.read-more:hover {
  color: #ffdd57;
}

.loading {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .news-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .news-container {
    box-sizing: border-box;
  }

  .big-news {
    order: -1;
    width: 100%;
    height: 30vh;
    margin-bottom: 20px;
    background-size: cover;
  }

  .big-newscontent {
    font-size: 0.9em;
    padding: 10px 0;
  }

  .big-newscontent h2 {
    margin: 0;
    font-size: 1em;
  }

  .news-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .news-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .news-title {
    font-size: 1em;
    padding: 10px 0;
  }

  .read-more {
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .news-grid {
    gap: 10px;
  }

  .big-news {
    margin-bottom: 15px;
  }

  .news-title {
    font-size: 0.9em;
  }

  .read-more {
    font-size: 0.8em;
  }
}
</style>
