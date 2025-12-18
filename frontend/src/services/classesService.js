import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const classesService = {
  /**
   * Récupérer toutes les classes/promotions
   * @returns {Promise} Liste des classes
   */
  async getAll() {
    try {
      const response = await api.get(API_ENDPOINTS.CLASSES.ALL);
      
      if (response.data.success) {
        return response.data.data.classes;
      }
      throw new Error(response.data.message || 'Erreur de récupération');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la récupération des classes'
      );
    }
  },
};

