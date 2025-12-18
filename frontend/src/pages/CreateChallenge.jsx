import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { challengesService } from '../services/challengesService';
import './CreateChallenge.css';

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setError('');

    if (!title.trim() || !category || !description.trim()) {
      setError('Merci de remplir tous les champs du formulaire.');
      return;
    }

    setLoading(true);
    try {
      await challengesService.createChallenge({
        title: title.trim(),
        category,
        description: description.trim(),
      });
      navigate('/challenges');
    } catch (err) {
      console.error('Erreur de création du challenge:', err);
      setError(err.message || 'Erreur lors de la création du challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/challenges');
  };
  return (
    <div className="create-challenge-page">
      <div className="page-header">
        <h1 className="page-title">Créer un challenge</h1>
        <p className="page-subtitle">Proposez un nouveau défi à la communauté Inter-Ville</p>
      </div>

      <div className="create-challenge-form">
        {error && (
          <div
            style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Titre du challenge</label>
          <input
            type="text"
            className="input-field"
            placeholder="Ex: Créer un algorithme de tri optimal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Catégorie</label>
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="CODE">CODE</option>
            <option value="SPORT">SPORT</option>
            <option value="CUISINE">CUISINE</option>
            <option value="GAMING">GAMING</option>
            <option value="MUSIQUE">MUSIQUE</option>
            <option value="ART">ART</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Description détaillée</label>
          <textarea
            className="input-field textarea-field"
            rows="10"
            placeholder={`Décrivez votre challenge en détail :\n- Objectifs\n- Règles\n- Critères d'évaluation\n- Conseils`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Créer le challenge'}
          </button>
          <button 
            className="btn" 
            style={{ background: 'transparent', color: 'var(--text-secondary)' }}
            onClick={handleCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;

