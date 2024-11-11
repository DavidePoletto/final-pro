import { createStore } from 'vuex';

export default createStore({
  state: {
    games: {
      trending: [],
      newReleases: [],
      topRated: [],
      upcoming: [],
      singleplayer: [],
      multiplayer: [],
      openWorld: [],
    },
    gameDetailsCache: {},
    gamePrices: {}, // Stato per memorizzare i prezzi dei giochi
    news: [],
    newsLoaded: false,
    cartItems: [],
    loading: {
      games: false,
      news: false,
    },
    error: {
      games: null,
      news: null,
    },
  },
  mutations: {
    setGames(state, { category, games }) {
      state.games[category] = games;
    },
    setNews(state, news) {
      console.log("Committing news to state:", news); // Debug: verifica il commit
      state.news = news || []; // Imposta un array vuoto come fallback
      state.newsLoaded = true;
    },
    addToCart(state, game) {
      const existingItem = state.cartItems.find((item) => item.id === game.id);
      if (existingItem) {
        existingItem.quantity += 1; // Aumenta la quantità se il gioco è già nel carrello
      } else {
        state.cartItems.push({ ...game, quantity: 1 }); // Aggiunge il gioco al carrello
      }
    },

    removeFromCart(state, gameId) {
      const item = state.cartItems.find((item) => item.id === gameId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    
    removeItem(state, gameId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== gameId);
    },

    setGamePrice(state, { gameId, price }) {
      state.gamePrices[gameId] = price;
    },
    setLoading(state, { key, value }) {
      state.loading[key] = value;
    },
    setError(state, { key, error }) {
      state.error[key] = error;
    },
    setGameDetails(state, { gameId, details }) {
      state.gameDetailsCache[gameId] = details;
    },
  },
  actions: {
    async fetchShopGames({ commit }) {
      commit('setLoading', { key: 'games', value: true });
      commit('setError', { key: 'games', error: null });
      try {
        const response = await fetch('https://server-node-lcxi.onrender.com/api/shop/games');
        const data = await response.json();

        commit('setGames', { category: 'trending', games: data.trending });
        commit('setGames', { category: 'newReleases', games: data.newReleases });
        commit('setGames', { category: 'topRated', games: data.topRated });
        commit('setGames', { category: 'upcoming', games: data.upcoming });
        commit('setGames', { category: 'singleplayer', games: data.singleplayerGames });
        commit('setGames', { category: 'multiplayer', games: data.multiplayerGames });
        commit('setGames', { category: 'openWorld', games: data.openWorldGames });
      } catch (error) {
        commit('setError', { key: 'games', error: error.message });
        console.error("Errore nel caricamento dei giochi dal server:", error.message);
      } finally {
        commit('setLoading', { key: 'games', value: false });
      }
    },
    async fetchNews({ commit }) {
      commit('setLoading', { key: 'news', value: true });
      commit('setError', { key: 'news', error: null });
      try {
        const response = await fetch('https://server-node-lcxi.onrender.com/api/news/gaming?page_size=14'); // Richiedi tutte le notizie in una sola chiamata
        const data = await response.json();
        console.log("Data from API:", data);
        commit('setNews', data.articles);
      } catch (error) {
        commit('setError', { key: 'news', error: error.message });
        console.error('Errore nel caricamento delle news:', error.message);
      } finally {
        commit('setLoading', { key: 'news', value: false });
      }
    },
      async fetchGameDetails({ state, commit }, gameId) {
        if (state.gameDetailsCache[gameId]) {
          // Gioco già in cache, ritorna subito senza chiamare l'API
          return state.gameDetailsCache[gameId];
        }
    
        try {
          const response = await fetch(`https://server-node-lcxi.onrender.com/api/shop/games/${gameId}`);
          const data = await response.json();
          commit('setGameDetails', { gameId, details: data });
          return data; // Ritorna i dettagli ottenuti
        } catch (error) {
          console.error('Errore nel caricamento dei dettagli del gioco:', error.message);
          throw error;
        }
      },
  },
  getters: {
    trendingGames: (state) => state.games.trending,
    newReleases: (state) => state.games.newReleases,
    topRatedGames: (state) => state.games.topRated,
    upcomingGames: (state) => state.games.upcoming,
    singleplayerGames: (state) => state.games.singleplayer,
    multiplayerGames: (state) => state.games.multiplayer,
    openWorldGames: (state) => state.games.openWorld,
    cartItems: (state) => state.cartItems,
    getGamePrice: (state) => (gameId) => state.gamePrices[gameId],
    isLoading: (state) => (key) => state.loading[key],
    getError: (state) => (key) => state.error[key],
    allNews: (state) => state.news,
    getCachedGameDetails: (state) => (gameId) => state.gameDetailsCache[gameId],
  },
});
