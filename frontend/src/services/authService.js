import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  /**
   * Connexion d'un utilisateur
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Token JWT
   */
  async login(credentials) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      if (response.data.success) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.data.data);
        return response.data;
      }
      throw new Error(response.data.message || 'Erreur de connexion');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la connexion'
      );
    }
  },

  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise} Données de l'utilisateur créé
   */
  async register(userData) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      
      if (response.data.success) {
        return response.data;
      }
      throw new Error(response.data.message || 'Erreur d\'inscription');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de l\'inscription'
      );
    }
  },

  /**
   * Récupérer les données de l'utilisateur connecté
   * @returns {Promise} Données de l'utilisateur
   */
  async getCurrentUser() {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.PROTECTED);
      
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Erreur de récupération');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la récupération des données'
      );
    }
  },

  /**
   * Vérifier l'email avec un token
   * @param {string} token - Token de vérification
   * @returns {Promise} Résultat de la vérification
   */
  async verifyEmail(token) {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        params: { token }
      });
      
      if (response.data.success) {
        return response.data;
      }
      throw new Error(response.data.message || 'Erreur de vérification');
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la vérification'
      );
    }
  },

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Récupérer le token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  },
};

