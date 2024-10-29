import { createStore } from 'vuex'; // Assicurati che questa importazione sia presente in cima al file

export default createStore({
  state: {
    games: {
      trending: [],
      newReleases: [],
      topRated: [],
      upcoming: [],
      singleplayer: [], // Coerenza nel nome della categoria
      multiplayer: [],
      openWorld: [],
    },
    news: [],
  },
  mutations: {
    setGames(state, { category, games }) {
      state.games[category] = games;
    },
    setNews(state, news) {
      state.news = news;
    },
  },
  actions: {
    async fetchShopGames({ commit }) {
      try {
        const response = await fetch('https://server-node-lcxi.onrender.com/api/shop/games');
        const data = await response.json();

        commit('setGames', { category: 'trending', games: data.trending });
        commit('setGames', { category: 'newReleases', games: data.newReleases });
        commit('setGames', { category: 'topRated', games: data.topRated });
        commit('setGames', { category: 'upcoming', games: data.upcoming });
        commit('setGames', { category: 'singleplayer', games: data.singleplayerGames }); // Usa "singleplayer"
        commit('setGames', { category: 'multiplayer', games: data.multiplayerGames });
        commit('setGames', { category: 'openWorld', games: data.openWorldGames });
      } catch (error) {
        console.error("Errore nel caricamento dei giochi dal server:", error.message);
      }
    },
    async fetchNews({ commit }) {
      try {
        const response = await fetch('https://server-node-lcxi.onrender.com/api/news/gaming');
        const data = await response.json();
        commit('setNews', data.articles);
      } catch (error) {
        console.error('Errore nel caricamento delle news:', error.message);
      }
    },
  },
  getters: {
    trendingGames: (state) => state.games.trending,
    newReleases: (state) => state.games.newReleases,
    topRatedGames: (state) => state.games.topRated,
    upcomingGames: (state) => state.games.upcoming,
    singleplayerGames: (state) => state.games.singleplayer, // Usa "singleplayerGames"
    multiplayerGames: (state) => state.games.multiplayer,
    openWorldGames: (state) => state.games.openWorld,
    allNews: (state) => state.news,
  },
});
