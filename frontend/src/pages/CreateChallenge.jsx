import { useNavigate } from 'react-router-dom';
import './CreateChallenge.css';

const CreateChallenge = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    console.log('Créer le challenge');
    // Logique de création
    navigate('/challenges');
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
        <div className="input-group">
          <label className="input-label">Titre du challenge</label>
          <input
            type="text"
            className="input-field"
            placeholder="Ex: Créer un algorithme de tri optimal"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Catégorie</label>
          <select className="input-field">
            <option>Sélectionner une catégorie</option>
            <option>CODE</option>
            <option>SPORT</option>
            <option>CUISINE</option>
            <option>GAMING</option>
            <option>MUSIQUE</option>
            <option>ART</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Description détaillée</label>
          <textarea
            className="input-field textarea-field"
            rows="10"
            placeholder={`Décrivez votre challenge en détail :\n- Objectifs\n- Règles\n- Critères d'évaluation\n- Conseils`}
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            Créer le challenge
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

