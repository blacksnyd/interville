import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Calendar, Users } from 'lucide-react';
import { challengesService } from '../services/challengesService';
import './ChallengeDetail.css';

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentSending, setCommentSending] = useState(false);

  const loadChallenge = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await challengesService.getChallenge(id);
      setChallenge(data);
    } catch (err) {
      console.error('Erreur de chargement du challenge:', err);
      setError(err.message || 'Erreur lors du chargement du challenge');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadChallenge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Date inconnue';
    }
  };

  const handleParticipate = async () => {
    if (!id) return;
    setJoining(true);
    setError('');
    try {
      await challengesService.participate(id);
      await loadChallenge();
    } catch (err) {
      console.error('Erreur de participation:', err);
      setError(err.message || 'Erreur lors de la participation');
    } finally {
      setJoining(false);
    }
  };

  const handleAddComment = async () => {
    if (!id || !newComment.trim()) return;
    setCommentSending(true);
    setError('');
    try {
      await challengesService.addComment(id, newComment.trim());
      setNewComment('');
      await loadChallenge();
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
      setError(err.message || "Erreur lors de l'ajout du commentaire");
    } finally {
      setCommentSending(false);
    }
  };

  if (loading) {
    return (
      <div className="challenge-detail-page">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Chargement du challenge...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="challenge-detail-page">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Challenge introuvable</div>
      </div>
    );
  }

  return (
    <div className="challenge-detail-page">
      <Link to="/challenges" className="back-link">
        <ArrowLeft size={20} />
        Retour aux challenges
      </Link>

      <div className="challenge-detail-content">
        <div className="challenge-detail-main">
          <div className="challenge-tag challenge-tag-purple">{challenge.category}</div>
          <h1 className="challenge-detail-title">{challenge.title}</h1>
          
          <div className="challenge-meta-info">
            <div className="meta-item">
              <User size={20} />
              <span>{challenge.author || 'Anonyme'}</span>
            </div>
            <div className="meta-item">
              <MapPin size={20} />
              <span>{challenge.location || 'Non renseignée'}</span>
            </div>
            <div className="meta-item">
              <Calendar size={20} />
              <span>{formatDate(challenge.created_at)}</span>
            </div>
            <div className="meta-item">
              <Users size={20} />
              <span>{challenge.participants} participants</span>
            </div>
          </div>

          <div className="challenge-description">
            <p>
              {challenge.description}
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

          <div className="challenge-section">
            <h3 className="section-heading">Commentaires</h3>
            {challenge.comments && challenge.comments.length > 0 ? (
              <div className="comments-list">
                {challenge.comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">
                        {comment.author || 'Utilisateur'}
                      </span>
                      <span className="comment-date">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Aucun commentaire pour le moment.
              </p>
            )}

            <div className="add-comment">
              <textarea
                className="input-field textarea-field"
                rows="3"
                placeholder="Ajouter un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddComment}
                disabled={commentSending || !newComment.trim()}
                style={{ marginTop: '0.75rem' }}
              >
                {commentSending ? 'Envoi...' : 'Publier le commentaire'}
              </button>
            </div>
          </div>
        </div>

        <div className="challenge-detail-sidebar">
          <div className="participation-card">
            <h3 className="participation-title">Participation</h3>
            <button 
              className="btn btn-primary participation-btn"
              onClick={handleParticipate}
              disabled={joining}
            >
              {joining ? 'Participation...' : 'Participer'}
            </button>
            <div className="participation-stats">
              <div className="participation-stat">
                <span className="stat-label">Participants</span>
                <span className="stat-value">{challenge.participants}</span>
              </div>
              <div className="participation-stat">
                <span className="stat-label">Commentaires</span>
                <span className="stat-value">{challenge.commentsCount}</span>
              </div>
              <div className="participation-stat">
                <span className="stat-label">Créé le</span>
                <span className="stat-value">{formatDate(challenge.created_at)}</span>
              </div>
            </div>
            {error && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;


