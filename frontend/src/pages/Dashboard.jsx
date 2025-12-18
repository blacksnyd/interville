import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import './Dashboard.css';

const Dashboard = () => {
  const [counters, setCounters] = useState({
    activeChallenges: 0,
    participants: 0,
    comments: 0,
    participationRate: 0,
  });
  const [latestChallenges, setLatestChallenges] = useState([]);
  const [topParticipants, setTopParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const kpis = [
    {
      label: 'Challenges actifs',
      value: counters.activeChallenges,
      icon: Trophy,
      color: 'purple',
    },
    {
      label: 'Participants',
      value: counters.participants,
      icon: Users,
      color: 'green',
    },
    {
      label: 'Commentaires',
      value: counters.comments,
      icon: MessageSquare,
      color: 'purple',
    },
    {
      label: 'Taux de participation',
      value: `${counters.participationRate}%`,
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await dashboardService.getStats();
        setCounters(data.counters || {});
        setLatestChallenges(data.latestChallenges || []);
        setTopParticipants(data.topParticipants || []);
      } catch (err) {
        console.error('Erreur de chargement du dashboard:', err);
        setError(err.message || 'Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
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
          {loading ? (
            <div style={{ padding: '1rem', color: '#6b7280' }}>
              Chargement des derniers challenges...
            </div>
          ) : latestChallenges.length === 0 ? (
            <div style={{ padding: '1rem', color: '#6b7280' }}>
              Aucun challenge pour le moment.
            </div>
          ) : (
            <div className="challenges-list">
              {latestChallenges.map((challenge) => (
                <Link 
                  key={challenge.id} 
                  to={`/challenges/${challenge.id}`}
                  className="challenge-card-small"
                >
                  <div className={`challenge-tag challenge-tag-purple`}>
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
          )}
        </div>

        {/* Top Participants */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Top Participants</h2>
          </div>
          {loading ? (
            <div style={{ padding: '1rem', color: '#6b7280' }}>
              Chargement des top participants...
            </div>
          ) : topParticipants.length === 0 ? (
            <div style={{ padding: '1rem', color: '#6b7280' }}>
              Pas encore de participations.
            </div>
          ) : (
            <div className="participants-list">
              {topParticipants.map((participant, index) => (
                <div key={participant.rank ?? index} className="participant-item">
                  <div className={`participant-rank rank-yellow`}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

