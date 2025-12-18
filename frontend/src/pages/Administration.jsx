import { useState, useEffect } from 'react';
import { MapPin, Calendar, Check, X } from 'lucide-react';
import { usersService } from '../services/usersService';
import './Administration.css';

const Administration = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState({});
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState('');

  const loadPendingUsers = async () => {
    setLoadingList(true);
    setError('');
    try {
      const users = await usersService.getPendingUsers();
      // Formater les données pour correspondre à la structure attendue
      const formattedUsers = users.map(user => {
        let formattedDate = 'Date inconnue';
        if (user.requestDate) {
          try {
            formattedDate = new Date(user.requestDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });
          } catch (e) {
            console.error('Erreur de formatage de date:', e);
          }
        }
        
        return {
          id: user.id,
          name: user.username,
          promo: user.promo || 'Non spécifié',
          email: user.email,
          location: user.location || 'Non spécifié',
          requestDate: formattedDate
        };
      });
      setPendingAccounts(formattedUsers);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des utilisateurs');
      console.error('Erreur de chargement:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const handleValidate = async (accountId) => {
    setLoading({ ...loading, [accountId]: true });
    setError('');
    try {
      await usersService.validateUser(accountId);
      // Recharger la liste après validation
      await loadPendingUsers();
    } catch (err) {
      setError(err.message || 'Erreur lors de la validation');
      console.error('Erreur de validation:', err);
    } finally {
      setLoading({ ...loading, [accountId]: false });
    }
  };

  const handleReject = (accountId) => {
    // TODO: Implémenter l'endpoint de refus si disponible dans le backend
    console.log('Refuser le compte:', accountId);
    alert('Fonctionnalité de refus à implémenter');
  };

  return (
    <div className="administration-page">
      <div className="page-header">
        <h1 className="page-title">Administration</h1>
      </div>

      {/* Key Metrics */}
      <div className="admin-kpis">
        <div className="admin-kpi-card">
          <div className="admin-kpi-value">156</div>
          <div className="admin-kpi-label">Utilisateurs actifs</div>
        </div>
        <div className="admin-kpi-card">
          <div className="admin-kpi-value">{pendingAccounts.length}</div>
          <div className="admin-kpi-label">En attente de validation</div>
        </div>
        <div className="admin-kpi-card">
          <div className="admin-kpi-value">24</div>
          <div className="admin-kpi-label">Challenges publiés</div>
        </div>
        <div className="admin-kpi-card">
          <div className="admin-kpi-value">0</div>
          <div className="admin-kpi-label">Signalements</div>
        </div>
      </div>

      {/* Pending Accounts */}
      <div className="card">
        <h2 className="section-title">Comptes en attente de validation</h2>
        {error && (
          <div style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '8px',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}
        {loadingList ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div>Chargement des comptes en attente...</div>
          </div>
        ) : pendingAccounts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            Aucun compte en attente de validation
          </div>
        ) : (
          <div className="pending-accounts-list">
            {pendingAccounts.map((account) => (
            <div key={account.id} className="pending-account-item">
              <div className="account-info">
                <div className="account-header">
                  <div>
                    <div className="account-name">{account.name}</div>
                    <div className="account-promo">{account.promo}</div>
                  </div>
                </div>
                <div className="account-details">
                  <div className="account-detail">
                    <MapPin size={16} />
                    <span>{account.location}</span>
                  </div>
                  <div className="account-detail">
                    <Calendar size={16} />
                    <span>Demande le {account.requestDate}</span>
                  </div>
                  <div className="account-email">{account.email}</div>
                </div>
              </div>
              <div className="account-actions">
                <button 
                  className="btn btn-success"
                  onClick={() => handleValidate(account.id)}
                  disabled={loading[account.id]}
                >
                  <Check size={16} />
                  {loading[account.id] ? 'Validation...' : 'Valider'}
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(account.id)}
                  disabled={loading[account.id]}
                >
                  <X size={16} />
                  Refuser
                </button>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Administration;

