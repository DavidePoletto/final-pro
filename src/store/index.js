import { createStore } from 'vuex';
import cookieModule from './modules/cookieModule';
import authModule from './modules/authModule';
import orderModule from './modules/orderModule';

export default createStore({
  modules: {
    cookieModule,
    authModule,
    orderModule,
  },
  state: {
    games: {
      trending: [],
      newReleases: [],
      topRated: [],
      upcoming: [],
      nintendoGames: [],
      multiplayer: [],
    },
    gameDetailsCache: {},
    gamePrices: {},
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
      state.news = news || [];
      state.newsLoaded = true;
    },
    addToCart(state, game) {
      const existingItem = state.cartItems.find((item) => item.id === game.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...game, quantity: 1 });
      }
    },
    removeFromCart(state, gameId) {
      const item = state.cartItems.find((item) => item.id === gameId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== gameId);
      }
    },
    clearCart(state) {
      state.cartItems = [];
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
        commit('setGames', { category: 'nintendoGames', games: data.nintendoGames });
        commit('setGames', { category: 'multiplayer', games: data.multiplayerGames });
      } catch (error) {
        commit('setError', { key: 'games', error: error.message });
      } finally {
        commit('setLoading', { key: 'games', value: false });
      }
    },
    async fetchNews({ commit }) {
      commit('setLoading', { key: 'news', value: true });
      commit('setError', { key: 'news', error: null });
      try {
        const response = await fetch('https://server-node-lcxi.onrender.com/api/news/gaming?page_size=14');
        const data = await response.json();
        commit('setNews', data.articles);
      } catch (error) {
        commit('setError', { key: 'news', error: error.message });
      } finally {
        commit('setLoading', { key: 'news', value: false });
      }
    },
    async fetchGameDetails({ state, commit }, gameId) {
      if (state.gameDetailsCache[gameId]) {
        return state.gameDetailsCache[gameId];
      }
      try {
        const response = await fetch(`https://server-node-lcxi.onrender.com/api/shop/games/${gameId}`);
        const data = await response.json();
        commit('setGameDetails', { gameId, details: data });
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    trendingGames: (state) => state.games.trending,
    newReleases: (state) => state.games.newReleases,
    topRatedGames: (state) => state.games.topRated,
    upcomingGames: (state) => state.games.upcoming,
    nintendoGames: (state) => state.games.nintendoGames,
    multiplayerGames: (state) => state.games.multiplayer,
    cartItems: (state) => state.cartItems,
    getGamePrice: (state) => (gameId) => state.gamePrices[gameId],
    isLoading: (state) => (key) => state.loading[key],
    getError: (state) => (key) => state.error[key],
    allNews: (state) => state.news,
    getCachedGameDetails: (state) => (gameId) => state.gameDetailsCache[gameId],
  },
});
