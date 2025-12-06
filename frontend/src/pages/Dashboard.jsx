import { Link } from 'react-router-dom';
import { Trophy, Users, MessageSquare, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const kpis = [
    { 
      label: 'Challenges actifs', 
      value: '24', 
      icon: Trophy,
      color: 'purple'
    },
    { 
      label: 'Participants', 
      value: '156', 
      icon: Users,
      color: 'green'
    },
    { 
      label: 'Commentaires', 
      value: '342', 
      icon: MessageSquare,
      color: 'purple'
    },
    { 
      label: 'Taux de participation', 
      value: '89%', 
      icon: TrendingUp,
      color: 'orange'
    },
  ];

  const latestChallenges = [
    {
      id: 1,
      category: 'CODE',
      title: 'Créer un algorithme de tri optimal',
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
      author: 'Thomas Dubois',
      location: 'Aix-en-Provence',
      participants: 23,
      comments: 15,
      categoryColor: 'blue'
    },
  ];

  const topParticipants = [
    { rank: 1, name: 'Lucas Bernard', location: 'Marseille', points: '1250 pts', rankColor: 'yellow' },
    { rank: 2, name: 'Emma Rousseau', location: 'Nice', points: '1180 pts', rankColor: 'gray' },
    { rank: 3, name: 'Hugo Petit', location: 'Aix-en-Provence', points: '1050 pts', rankColor: 'orange' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      {/* KPIs Section */}
      <div className="kpis-grid">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className={`kpi-card kpi-${kpi.color}`}>
              <div className="kpi-icon">
                <Icon size={24} />
              </div>
              <div className="kpi-content">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        {/* Latest Challenges */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Derniers challenges</h2>
            <Link to="/challenges" className="btn-link">Voir tout</Link>
          </div>
          <div className="challenges-list">
            {latestChallenges.map((challenge) => (
              <Link 
                key={challenge.id} 
                to={`/challenges/${challenge.id}`}
                className="challenge-card-small"
              >
                <div className={`challenge-tag challenge-tag-${challenge.categoryColor}`}>
                  {challenge.category}
                </div>
                <h3 className="challenge-title-small">{challenge.title}</h3>
                <div className="challenge-meta">
                  <span>Par {challenge.author}</span>
                  <span className="challenge-location">{challenge.location}</span>
                </div>
                <div className="challenge-stats">
                  <span className="stat-item">
                    <Users size={16} />
                    {challenge.participants}
                  </span>
                  <span className="stat-item">
                    <MessageSquare size={16} />
                    {challenge.comments}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Participants */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Top Participants</h2>
          </div>
          <div className="participants-list">
            {topParticipants.map((participant) => (
              <div key={participant.rank} className="participant-item">
                <div className={`participant-rank rank-${participant.rankColor}`}>
                  {participant.rank}
                </div>
                <div className="participant-info">
                  <div className="participant-name">{participant.name}</div>
                  <div className="participant-location">{participant.location}</div>
                </div>
                <div className="participant-points">{participant.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

