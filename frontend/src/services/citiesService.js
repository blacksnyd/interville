import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const citiesService = {
  /**
   * Récupérer toutes les villes
   * @returns {Promise} Liste des villes
   */
  async getAll() {
    try {
      const response = await api.get(API_ENDPOINTS.CITIES.ALL);
      
      if (response.data.success) {
        return response.data.data.cities;
      }
      throw new Error(response.data.message || 'Erreur de récupération');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la récupération des villes'
      );
    }
  },
};

