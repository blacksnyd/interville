import { Link } from 'react-router-dom';
import { MapPin, Calendar, Trophy, Award, MessageSquare, User, Lock, CheckCircle, XCircle, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Profil.css';

const Profil = () => {
  const { user } = useAuth();
  const handleEditProfile = () => {
    console.log('Modifier le profil');
  };

  const userChallenges = [
    {
      id: 1,
      title: 'Créer un algorithme de tri optimal',
      participants: 12,
      comments: 8,
      category: 'CODE'
    },
    {
      id: 2,
      title: 'Développer une application mobile',
      participants: 8,
      comments: 5,
      category: 'CODE'
    },
  ];

  const badges = [
    { id: 1, name: 'Premier challenge' },
    { id: 2, name: 'Commentateur actif' },
    { id: 3, name: 'Expert CODE' },
  ];

  const participations = [
    {
      id: 1,
      title: 'Course de 5km en moins de 30 min',
      author: 'Thomas Dubois',
      category: 'SPORT'
    },
    {
      id: 2,
      title: 'Préparer un plat traditionnel',
      author: 'Sophie Lefebvre',
      category: 'CUISINE'
    },
  ];

  return (
    <div className="profil-page">
      <div className="page-header">
        <h1 className="page-title">Mon profil</h1>
      </div>

      <div className="profil-content">
        {/* Top Row: User Info + Stats */}
        <div className="profil-main">
          {/* User Info Card */}
          <div className="card user-info-card">
            <div className="user-avatar">
              <User size={40} style={{ color: 'var(--primary-color)' }} />
            </div>
            <h2 className="user-name">{user?.username || 'Utilisateur'}</h2>
            <p className="user-email">{user?.email || ''}</p>
            
            {/* Statuts de vérification et validation */}
            <div style={{ 
              marginBottom: '1rem', 
              padding: '0.75rem', 
              backgroundColor: '#f3f4f6', 
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: user?.is_verified ? '#10b981' : '#ef4444'
              }}>
                {user?.is_verified ? (
                  <CheckCircle size={18} />
                ) : (
                  <XCircle size={18} />
                )}
                <span style={{ fontSize: '0.875rem' }}>
                  Email {user?.is_verified ? 'vérifié' : 'non vérifié'}
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: user?.is_validated ? '#10b981' : '#f59e0b'
              }}>
                {user?.is_validated ? (
                  <CheckCircle size={18} />
                ) : (
                  <Mail size={18} />
                )}
                <span style={{ fontSize: '0.875rem' }}>
                  Compte {user?.is_validated ? 'validé' : 'en attente de validation'}
                </span>
              </div>
            </div>

            <div className="user-details">
              <div className="user-detail-item">
                <MapPin size={20} />
                <span>{user?.city?.name || 'Non renseigné'}</span>
              </div>
              <div className="user-detail-item">
                <Calendar size={20} />
                <span>{user?.class?.name || 'Non renseigné'}</span>
              </div>
              <div className="user-detail-item">
                <Trophy size={20} />
                <span>1250 points</span>
              </div>
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: '1.5rem', width: '100%' }}
              onClick={handleEditProfile}
            >
              Modifier le profil
            </button>
          </div>
          {/* Badges Section - Bottom Left */}
          <div className="card">
            <h3 className="section-title">Badges</h3>
            <div className="badges-list">
              {badges.map((badge) => (
                <div key={badge.id} className="badge-item">
                  <div className="badge-icon badge-icon-locked">
                    <Lock size={20} />
                  </div>
                  <span className="badge-name">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='right-div'>
          {/* Statistics Cards */}
          <div className="profil-stats">
            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <Trophy size={24} />
              </div>
              <div className="stat-value">5</div>
              <div className="stat-label">Challenges créés</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <Award size={24} />
              </div>
              <div className="stat-value">18</div>
              <div className="stat-label">Participations</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <MessageSquare size={24} />
              </div>
              <div className="stat-value">42</div>
              <div className="stat-label">Commentaires</div>
            </div>
          </div>

          {/* My Challenges Section - Left Column */}
          <div className="card">
            <h3 className="section-title">Mes challenges</h3>
            <div className="user-challenges-list">
              {userChallenges.map((challenge) => (
                <Link
                  key={challenge.id}
                  to={`/challenges/${challenge.id}`}
                  className="user-challenge-item"
                >
                  <div className="user-challenge-info">
                    <h4 className="user-challenge-title">{challenge.title}</h4>
                    <div className="user-challenge-stats">
                      <span>{challenge.participants} participants</span>
                      <span>{challenge.comments} commentaires</span>
                    </div>
                  </div>
                  <span className="challenge-tag-small">{challenge.category}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* My Participations Section - Right Column */}
          <div className="card">
            <h3 className="section-title">Mes participations</h3>
            <div className="participations-list">
              {participations.map((participation) => (
                <Link
                  key={participation.id}
                  to={`/challenges/${participation.id}`}
                  className="participation-item"
                >
                  <div className="participation-info">
                    <h4 className="participation-title">{participation.title}</h4>
                    <div className="participation-author">Par {participation.author}</div>
                  </div>
                  <span className={`challenge-tag-small challenge-tag-${participation.category.toLowerCase()}`}>
                    {participation.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profil;

