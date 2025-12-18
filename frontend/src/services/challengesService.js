import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const challengesService = {
  /**
   * Récupérer la liste des challenges
   * @param {Object} params - Filtres de recherche { search?, category? }
   */
  async getChallenges(params = {}) {
    try {
      const response = await api.get(API_ENDPOINTS.CHALLENGES.LIST, {
        params,
      });

      if (response.data.success) {
        return response.data.data.challenges;
      }
      throw new Error(response.data.message || 'Erreur de récupération des challenges');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération des challenges'
      );
    }
  },

  /**
   * Récupérer le détail d'un challenge
   * @param {number|string} id
   */
  async getChallenge(id) {
    try {
      const response = await api.get(API_ENDPOINTS.CHALLENGES.DETAIL(id));

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur de récupération du challenge');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération du challenge'
      );
    }
  },

  /**
   * Créer un nouveau challenge
   * @param {Object} payload - { title, description, category }
   */
  async createChallenge(payload) {
    try {
      const response = await api.post(API_ENDPOINTS.CHALLENGES.CREATE, payload);

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur de création du challenge');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la création du challenge'
      );
    }
  },

  /**
   * Participer à un challenge
   * @param {number|string} id
   */
  async participate(id) {
    try {
      const response = await api.post(API_ENDPOINTS.CHALLENGES.PARTICIPATE(id));

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur de participation');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la participation au challenge'
      );
    }
  },

  /**
   * Ajouter un commentaire à un challenge
   * @param {number|string} id
   * @param {string} content
   */
  async addComment(id, content) {
    try {
      const response = await api.post(API_ENDPOINTS.CHALLENGES.COMMENT(id), { content });

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur d\'ajout du commentaire');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de l’ajout du commentaire'
      );
    }
  },

  /**
   * Challenges créés par l'utilisateur connecté
   */
  async getMyChallenges() {
    try {
      const response = await api.get(API_ENDPOINTS.CHALLENGES.MINE);

      if (response.data.success) {
        return response.data.data.challenges;
      }
      throw new Error(response.data.message || 'Erreur de récupération de vos challenges');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération de vos challenges'
      );
    }
  },

  /**
   * Challenges auxquels l'utilisateur participe
   */
  async getMyParticipations() {
    try {
      const response = await api.get(API_ENDPOINTS.CHALLENGES.PARTICIPATIONS);

      if (response.data.success) {
        return response.data.data.challenges;
      }
      throw new Error(response.data.message || 'Erreur de récupération de vos participations');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération de vos participations'
      );
    }
  },
};


