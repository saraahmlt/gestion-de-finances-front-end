// src/api/axiosConfig.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gestion-de-finances-back-end.onrender.com', // Remplacez par l'URL de votre API
  timeout: 10000, // 10 secondes
});

export default apiClient;
