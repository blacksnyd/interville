# Configuration API Frontend-Backend

## 📋 Vue d'ensemble

Ce document explique comment connecter le frontend au backend et comment synchroniser votre environnement avec celui de votre équipe.

## 🔧 Configuration de l'API

### 1. Variables d'environnement

Créez un fichier `.env` à la racine du dossier `frontend` :

```bash
cd frontend
cp .env.example .env
```

Puis modifiez le fichier `.env` avec l'URL de votre backend :

```env
VITE_API_URL=http://localhost:3000
```

**Note :** Vite utilise le préfixe `VITE_` pour exposer les variables d'environnement au client.

### 2. Structure des services

- **`src/config/api.js`** : Configuration de base de l'API (URL, endpoints)
- **`src/services/api.js`** : Instance axios configurée avec intercepteurs
- **`src/services/authService.js`** : Service d'authentification
- **`src/contexts/AuthContext.jsx`** : Contexte React pour gérer l'authentification

## 🔐 Authentification

Le système utilise JWT (JSON Web Tokens) pour l'authentification.

### Fonctionnalités implémentées :

- ✅ Connexion (`/api/auth/login`)
- ✅ Inscription (`/api/auth/register`)
- ✅ Récupération de l'utilisateur connecté (`/api/auth/protected`)
- ✅ Vérification d'email (`/api/auth/verify-email`)
- ✅ Déconnexion
- ✅ Protection des routes
- ✅ Gestion automatique du token dans les headers

### Utilisation dans les composants :

```jsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Utiliser les fonctions d'authentification
};
```

## 🚀 Synchronisation avec l'équipe backend

### Option 1 : Utiliser Git (Recommandé)

Si votre équipe utilise Git :

```bash
# 1. Récupérer les dernières modifications du backend
cd backend
git pull origin main  # ou master, selon votre branche

# 2. Installer les dépendances
npm install

# 3. Vérifier les variables d'environnement
# Demandez à votre équipe le fichier .env.example ou les variables nécessaires
```

### Option 2 : Variables d'environnement

Demandez à votre équipe le fichier `.env.example` du backend ou la liste des variables nécessaires :

**Variables typiques du backend :**
- `PORT` : Port du serveur (ex: 3000)
- `DB_USER` : Utilisateur de la base de données
- `DB_PASSWORD` : Mot de passe de la base de données
- `DB_NAME` : Nom de la base de données
- `DB_HOST` : Hôte de la base de données
- `DB_PORT` : Port de la base de données
- `JWT_TOKEN` : Secret pour signer les tokens JWT
- `NODEMAILER_USER` : Email pour l'envoi de mails
- `NODEMAILER_PASSWORD` : Mot de passe pour l'envoi de mails

Créez un fichier `.env` dans le dossier `backend` :

```bash
cd backend
# Créez le fichier .env avec les valeurs de votre équipe
```

### Option 3 : Base de données

Si vous devez synchroniser la base de données :

```bash
cd backend

# Appliquer les migrations
npm run db:migrate

# (Optionnel) Charger les données de test
npm run db:seed
```

## 📡 Endpoints API disponibles

### Authentification

- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/auth/protected` - Récupérer l'utilisateur connecté (nécessite un token)
- `GET /api/auth/verify-email?token=...` - Vérifier l'email

### Format des réponses

Toutes les réponses suivent ce format :

```json
{
  "success": true,
  "message": "Message de succès",
  "data": { ... }
}
```

En cas d'erreur :

```json
{
  "success": false,
  "message": "Message d'erreur",
  "data": null
}
```

## 🧪 Tester la connexion

1. **Démarrer le backend :**
   ```bash
   cd backend
   npm run dev
   ```

2. **Démarrer le frontend :**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Tester la connexion :**
   - Ouvrez http://localhost:5173 (ou le port de Vite)
   - Allez sur la page de login
   - Essayez de vous connecter avec un compte existant

## 🔍 Dépannage

### Le frontend ne peut pas se connecter au backend

1. Vérifiez que le backend est démarré
2. Vérifiez l'URL dans `.env` (doit correspondre au port du backend)
3. Vérifiez la console du navigateur pour les erreurs CORS
4. Vérifiez que le backend autorise les requêtes depuis votre frontend (CORS configuré)

### Erreur 401 (Non autorisé)

- Vérifiez que le token est bien stocké dans le localStorage
- Vérifiez que le token n'est pas expiré
- Vérifiez que le backend utilise le même secret JWT

### Erreur CORS

Le backend doit avoir CORS configuré. Vérifiez dans `backend/src/app.js` que `cors()` est bien appelé.

## 📝 Prochaines étapes

Pour ajouter de nouveaux endpoints :

1. Ajoutez l'endpoint dans `src/config/api.js`
2. Créez une fonction dans le service approprié (ex: `src/services/challengeService.js`)
3. Utilisez `api` depuis `src/services/api.js` pour faire les appels

Exemple :

```javascript
// src/services/challengeService.js
import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const challengeService = {
  async getAll() {
    const response = await api.get('/api/challenges');
    return response.data;
  }
};
```

