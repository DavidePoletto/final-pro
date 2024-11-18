import { login, register } from '@/services/apiServices.js';

export default {
  namespaced: true,
  state: {
    user: (() => {
      const user = localStorage.getItem('user');
      try {
        return user && user !== 'undefined' ? JSON.parse(user) : null;
      } catch (e) {
        console.error('Errore durante il parsing dell\'utente da localStorage:', e);
        return null;
      }
    })(),
    token: localStorage.getItem('token') || null,
    orders: [],
    loading: false,
    error: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, error) {
      state.error = error;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      commit('setLoading', true);
      commit('setError', null);
    
      try {
        const response = await login(credentials);
        const { token, user } = response;
        commit('setToken', token);
        commit('setUser', user);
      } catch (error) {
        const status = error.response?.status;
        let errorMessage = 'Errore durante il login.';
    
        if (status === 404) {
          errorMessage = 'Account non trovato. Verifica le credenziali.';
        } else if (status === 401) {
          errorMessage = 'Password errata. Riprova.';
        }
    
        commit('setError', errorMessage);
        throw new Error(errorMessage); // Propaga l'errore al componente
      } finally {
        commit('setLoading', false);
      }
    },
    async register({ commit }, userData) {
      commit('setLoading', true);
      commit('setError', null);

      try {
        const response = await register(userData);
        const { token, user } = response;
        commit('setToken', token);
        commit('setUser', user);
      } catch (error) {
        const errorMessage = error?.data?.message || 'Errore durante la registrazione.';
        commit('setError', errorMessage);
        throw new Error(errorMessage);
      } finally {
        commit('setLoading', false);
      }
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
    error: (state) => state.error,
    loading: (state) => state.loading,
  },
};
