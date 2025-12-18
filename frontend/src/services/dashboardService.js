import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const dashboardService = {
  /**
   * Récupérer les statistiques du dashboard
   */
  async getStats() {
    try {
      const response = await api.get(API_ENDPOINTS.DASHBOARD.STATS);

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur de récupération des statistiques');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération des statistiques'
      );
    }
  },
};


