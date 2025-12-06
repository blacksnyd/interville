import { Link } from 'react-router-dom';
import { Search, MapPin, User, Users, MessageSquare } from 'lucide-react';
import './Challenges.css';

const Challenges = () => {
  const challenges = [
    {
      id: 1,
      category: 'CODE',
      title: 'Créer un algorithme de tri optimal',
      description: 'Développez un algorithme de tri performant et comparez-le avec les...',
      author: 'Alice Martin',
      location: 'Marseille',
      participants: 12,
      comments: 8,
      categoryColor: 'purple'
    },
    {
      id: 2,
      category: 'SPORT',
      title: 'Course de 5km en moins de 30 min',
      description: 'Relevez ce défi sportif et partagez votre temps avec la communauté.',
      author: 'Thomas Dubois',
      location: 'Aix-en-Provence',
      participants: 23,
      comments: 15,
      categoryColor: 'green'
    },
    {
      id: 3,
      category: 'CUISINE',
      title: 'Préparer un plat traditionnel de sa région',
      description: 'Cuisinez un plat typique de votre région et partagez la recette.',
      author: 'Sophie Lefebvre',
      location: 'Nice',
      participants: 18,
      comments: 24,
      categoryColor: 'orange'
    },
    {
      id: 4,
      category: 'GAMING',
      title: 'Speedrun sur un jeu rétro',
      description: 'Réalisez le meilleur temps sur un jeu rétro de votre choix.',
      author: 'Marc Dupont',
      location: 'Marseille',
      participants: 15,
      comments: 12,
      categoryColor: 'purple'
    },
    {
      id: 5,
      category: 'MUSIQUE',
      title: 'Composer une mélodie originale',
      description: 'Créez une composition musicale originale et partagez-la.',
      author: 'Julie Martin',
      location: 'Paris',
      participants: 20,
      comments: 18,
      categoryColor: 'pink'
    },
    {
      id: 6,
      category: 'ART',
      title: 'Dessiner un portrait numérique',
      description: 'Réalisez un portrait numérique créatif et artistique.',
      author: 'Pierre Leroy',
      location: 'Nice',
      participants: 14,
      comments: 10,
      categoryColor: 'red'
    },
  ];

  return (
    <div className="challenges-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Challenges</h1>
          <p className="page-subtitle">6 challenges disponibles</p>
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
          />
        </div>
        <select className="filter-select">
          <option>Toutes les catégories</option>
          <option>CODE</option>
          <option>SPORT</option>
          <option>CUISINE</option>
          <option>GAMING</option>
          <option>MUSIQUE</option>
          <option>ART</option>
        </select>
      </div>

      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <Link key={challenge.id} to={`/challenges/${challenge.id}`} className="challenge-card">
            <div className="challenge-card-header">
              <span className={`challenge-category challenge-category-${challenge.categoryColor}`}>
                {challenge.category}
              </span>
              <span className="challenge-location">
                <MapPin size={16} />
                {challenge.location}
              </span>
            </div>
            <h3 className="challenge-card-title">{challenge.title}</h3>
            <p className="challenge-card-description">{challenge.description}</p>
            <div className="challenge-card-footer">
              <div className="challenge-author">
                <User size={16} />
                {challenge.author}
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
    </div>
  );
};

export default Challenges;

