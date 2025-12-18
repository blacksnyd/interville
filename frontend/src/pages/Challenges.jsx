import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, Users, MessageSquare } from 'lucide-react';
import { challengesService } from '../services/challengesService';
import './Challenges.css';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getCategoryColor = (category) => {
    switch (category) {
      case 'CODE':
        return 'purple';
      case 'SPORT':
        return 'green';
      case 'CUISINE':
        return 'orange';
      case 'GAMING':
        return 'purple';
      case 'MUSIQUE':
        return 'pink';
      case 'ART':
        return 'red';
      default:
        return 'purple';
    }
  };

  useEffect(() => {
    const loadChallenges = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await challengesService.getChallenges();
        setChallenges(data);
      } catch (err) {
        console.error('Erreur de chargement des challenges:', err);
        setError(err.message || 'Erreur lors du chargement des challenges');
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, []);

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      !search ||
      challenge.title.toLowerCase().includes(search.toLowerCase()) ||
      (challenge.description || '')
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter || challenge.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="challenges-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Challenges</h1>
          <p className="page-subtitle">
            {filteredChallenges.length}{' '}
            {filteredChallenges.length > 1
              ? 'challenges disponibles'
              : 'challenge disponible'}
          </p>
        </div>
        <Link to="/challenges/new" className="btn btn-primary">
          + Nouveau challenge
        </Link>
      </div>

      <div className="challenges-filters">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher un challenge..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value || '')}
        >
          <option value="">Toutes les catégories</option>
          <option value="CODE">CODE</option>
          <option value="SPORT">SPORT</option>
          <option value="CUISINE">CUISINE</option>
          <option value="GAMING">GAMING</option>
          <option value="MUSIQUE">MUSIQUE</option>
          <option value="ART">ART</option>
        </select>
      </div>

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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Chargement des challenges...
        </div>
      ) : (
        <div className="challenges-grid">
          {filteredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              to={`/challenges/${challenge.id}`}
              className="challenge-card"
            >
              <div className="challenge-card-header">
                <span
                  className={`challenge-category challenge-category-${getCategoryColor(
                    challenge.category
                  )}`}
                >
                  {challenge.category}
                </span>
                <span className="challenge-location">
                  <MapPin size={16} />
                  {challenge.location || 'Non renseignée'}
                </span>
              </div>
              <h3 className="challenge-card-title">{challenge.title}</h3>
              <p className="challenge-card-description">
                {challenge.description}
              </p>
              <div className="challenge-card-footer">
                <div className="challenge-author">
                  <User size={16} />
                  {challenge.author || 'Anonyme'}
                </div>
                <div className="challenge-stats">
                  <span className="stat">
                    <Users size={16} />
                    {challenge.participants}
                  </span>
                  <span className="stat">
                    <MessageSquare size={16} />
                    {challenge.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Challenges;

