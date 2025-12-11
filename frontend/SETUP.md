# 🚀 Guide de démarrage rapide - Frontend

## Configuration initiale

### 1. Installer les dépendances

```bash
cd frontend
npm install
```

### 2. Configurer l'URL du backend

Créez un fichier `.env` à la racine du dossier `frontend` :

```bash
# Copiez ce contenu dans frontend/.env
VITE_API_URL=http://localhost:3000
```

**Important :** Remplacez `http://localhost:3000` par l'URL de votre backend si elle est différente.

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

Le frontend sera accessible sur http://localhost:5173 (ou un autre port si 5173 est occupé).

## 🔄 Synchroniser avec l'équipe backend

### Méthode 1 : Via Git (Recommandé)

```bash
# Dans le dossier backend
cd ../backend
git pull origin main  # ou master selon votre branche
npm install
```

### Méthode 2 : Variables d'environnement

Demandez à votre équipe le fichier `.env` du backend ou les variables suivantes :

- `PORT` : Port du serveur backend (par défaut: 3000)
- `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, `DB_PORT` : Configuration de la base de données
- `JWT_TOKEN` : Secret pour les tokens JWT
- `NODEMAILER_USER`, `NODEMAILER_PASSWORD` : Configuration email

Créez un fichier `.env` dans le dossier `backend` avec ces valeurs.

### Méthode 3 : Base de données

```bash
cd ../backend
npm run db:migrate  # Appliquer les migrations
npm run db:seed     # (Optionnel) Charger les données de test
```

## ✅ Vérifier que tout fonctionne

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

3. **Tester :**
   - Ouvrez http://localhost:5173
   - Allez sur la page de login
   - Essayez de vous connecter

## 📚 Documentation complète

Voir `README_API.md` pour plus de détails sur l'architecture et l'utilisation de l'API.

