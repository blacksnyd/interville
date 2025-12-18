import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const usersService = {
  /**
   * Récupérer les utilisateurs en attente de validation (admin seulement)
   * @returns {Promise} Liste des utilisateurs en attente
   */
  async getPendingUsers() {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.PENDING);
      
      if (response.data.success) {
        return response.data.data.users;
      }
      throw new Error(response.data.message || 'Erreur de récupération');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la récupération des utilisateurs en attente'
      );
    }
  },

  /**
   * Valider un utilisateur (admin seulement)
   * @param {number} userId - ID de l'utilisateur à valider
   * @returns {Promise} Utilisateur validé
   */
  async validateUser(userId) {
    try {
      const response = await api.patch(`${API_ENDPOINTS.USERS.VALIDATE}/${userId}/validate`);
      
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur de validation');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la validation de l\'utilisateur'
      );
    }
  },
};

