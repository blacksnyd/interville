import { Link } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Calendar, Users } from 'lucide-react';
import './ChallengeDetail.css';

const ChallengeDetail = () => {
  const handleParticipate = () => {
    console.log('Participer au challenge');
  };
  return (
    <div className="challenge-detail-page">
      <Link to="/challenges" className="back-link">
        <ArrowLeft size={20} />
        Retour aux challenges
      </Link>

      <div className="challenge-detail-content">
        <div className="challenge-detail-main">
          <div className="challenge-tag challenge-tag-purple">CODE</div>
          <h1 className="challenge-detail-title">Créer un algorithme de tri optimal</h1>
          
          <div className="challenge-meta-info">
            <div className="meta-item">
              <User size={20} />
              <span>Alice Martin</span>
            </div>
            <div className="meta-item">
              <MapPin size={20} />
              <span>Marseille</span>
            </div>
            <div className="meta-item">
              <Calendar size={20} />
              <span>5 décembre 2025</span>
            </div>
            <div className="meta-item">
              <Users size={20} />
              <span>12 participants</span>
            </div>
          </div>

          <div className="challenge-description">
            <p>
              Ce challenge consiste à développer un algorithme de tri performant et à le comparer avec ceux des autres participants.
            </p>
          </div>

          <div className="challenge-section">
            <h3 className="section-heading">Objectifs :</h3>
            <ul className="challenge-list">
              <li>Créer un algorithme de tri original</li>
              <li>Optimiser les performances (temps et mémoire)</li>
              <li>Documenter votre approche</li>
              <li>Tester sur différents types de données</li>
            </ul>
          </div>

          <div className="challenge-section">
            <h3 className="section-heading">Critères d'évaluation :</h3>
            <ul className="challenge-list">
              <li>Complexité temporelle</li>
              <li>Complexité spatiale</li>
              <li>Originalité de l'approche</li>
              <li>Qualité du code</li>
            </ul>
          </div>
        </div>

        <div className="challenge-detail-sidebar">
          <div className="participation-card">
            <h3 className="participation-title">Participation</h3>
            <button 
              className="btn btn-primary participation-btn"
              onClick={handleParticipate}
            >
              Participer
            </button>
            <div className="participation-stats">
              <div className="participation-stat">
                <span className="stat-label">Participants</span>
                <span className="stat-value">12</span>
              </div>
              <div className="participation-stat">
                <span className="stat-label">Commentaires</span>
                <span className="stat-value">3</span>
              </div>
              <div className="participation-stat">
                <span className="stat-label">Créé le</span>
                <span className="stat-value">5 décembre 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;

