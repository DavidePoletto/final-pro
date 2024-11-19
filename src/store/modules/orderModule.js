import { getOrdersAPI, createOrderAPI } from '@/services/apiServices';

export default {
  namespaced: true,
  state: {
    orders: [],
    loading: false,
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      commit('setLoading', true);
      try {
        const orders = await getOrdersAPI();
        commit('setOrders', orders);
      } catch (error) {
        console.error('Errore durante il recupero degli ordini:', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async createOrder({ commit }, orderData) {
        try {
          const response = await createOrderAPI(orderData); // Chiamata API
          commit('addOrder', response.order); // Aggiorna lo store
        } catch (error) {
          console.error('Errore durante la creazione dell\'ordine:', error);
          throw error; // Lancia l'errore per gestirlo nel componente
      }
    },
  },
  getters: {
    orders: (state) => state.orders,
    loading: (state) => state.loading,
  },
};
