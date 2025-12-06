import { MapPin, Calendar, Check, X } from 'lucide-react';
import './Administration.css';

const Administration = () => {
  const handleValidate = (accountId) => {
    console.log('Valider le compte:', accountId);
  };

  const handleReject = (accountId) => {
    console.log('Refuser le compte:', accountId);
  };
  const pendingAccounts = [
    {
      id: 1,
      name: 'Marie Durand',
      promo: 'Promo 2025',
      email: 'marie.durand@laplateforme.io',
      location: 'Marseille',
      requestDate: '5 déc. 2025'
    },
    {
      id: 2,
      name: 'Paul Bertrand',
      promo: 'Promo 2024',
      email: 'paul.bertrand@laplateforme.io',
      location: 'Nice',
      requestDate: '5 déc. 2025'
    },
    {
      id: 3,
      name: 'Julie Renard',
      promo: 'Promo 2026',
      email: 'julie.renard@laplateforme.io',
      location: 'Aix-en-Provence',
      requestDate: '4 déc. 2025'
    },
  ];

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
          <div className="admin-kpi-value">3</div>
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
                >
                  <Check size={16} />
                  Valider
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(account.id)}
                >
                  <X size={16} />
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Administration;

