// Configuration de l'API
// L'URL du backend peut être définie via une variable d'environnement
// Par défaut, on utilise localhost:5000 (port par défaut du backend)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROTECTED: '/api/auth/protected',
    VERIFY_EMAIL: '/api/auth/verify-email',
  },
  CITIES: {
    ALL: '/api/cities/all',
  },
  CLASSES: {
    ALL: '/api/classes/all',
  },
  USERS: {
    PENDING: '/api/users/pending',
    VALIDATE: '/api/users',
  },
  CHALLENGES: {
    LIST: '/api/challenges',
    MINE: '/api/challenges/mine',
    PARTICIPATIONS: '/api/challenges/participations',
    DETAIL: (id) => `/api/challenges/${id}`,
    CREATE: '/api/challenges',
    PARTICIPATE: (id) => `/api/challenges/${id}/participate`,
    COMMENT: (id) => `/api/challenges/${id}/comments`,
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
  },
  CHAT: {
    MESSAGES: '/api/chat',
  },
};

