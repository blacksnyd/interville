import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const chatService = {
  /**
   * Récupérer les messages du chat (dernier 50)
   */
  async getMessages() {
    try {
      const response = await api.get(API_ENDPOINTS.CHAT.MESSAGES);

      if (response.data.success) {
        return response.data.data.messages;
      }
      throw new Error(response.data.message || 'Erreur de récupération des messages');
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erreur lors de la récupération des messages'
      );
    }
  },

  /**
   * Envoyer un message
   * @param {string} content
   */
  async sendMessage(content) {
    try {
      const response = await api.post(API_ENDPOINTS.CHAT.MESSAGES, { content });

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Erreur lors de l'envoi du message");
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Erreur lors de l'envoi du message"
      );
    }
  },
};


