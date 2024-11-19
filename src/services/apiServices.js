import axios from 'axios';

const API_BASE_URL = 'https://server-node-lcxi.onrender.com/api';

// Funzione per il login
export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

// Funzione per la registrazione
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    // Propagazione degli errori dettagliati
    throw error.response?.data || error;
  }
};

export const getOrdersAPI = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token non disponibile');
  
  const response = await axios.get(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createOrderAPI = async (orderData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token non disponibile');
  
  try {
    console.log('Dati inviati al server:', orderData); // Log per debug
    const response = await axios.post(`${API_BASE_URL}/orders/create`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Errore durante la creazione dell\'ordine:', error.response?.data || error.message);
    throw error;
  }
};