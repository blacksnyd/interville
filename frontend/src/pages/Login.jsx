import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, Lock } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    pseudo: '',
    ville: '',
    promotion: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <div className='logo'>
              <Users size={40} style={{ color: 'white' }} />
            </div>
          </div>
          <h1 className="auth-title">Inter-Ville</h1>
          <p className="auth-subtitle">Réseau social de défis CDPI La Plateforme</p>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Connexion
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Inscription
            </button>
          </div>

          {isLogin ? (
            <form className="auth-form">
              <div className="input-group">
                <label className="input-label">Email professionnel</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="prenom.nom@laplateforme.io"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Mot de passe</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Link to="/dashboard" className="btn btn-primary auth-submit">
                Se connecter
              </Link>
            </form>
          ) : (
            <form className="auth-form">
              <div className="input-group">
                <label className="input-label">Pseudo</label>
                <input
                  type="text"
                  name="pseudo"
                  className="input-field"
                  placeholder="Votre pseudo"
                  value={formData.pseudo}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Ville</label>
                <select
                  name="ville"
                  className="input-field"
                  value={formData.ville}
                  onChange={handleChange}
                >
                  <option>Sélectionner votre ville</option>
                  <option>Marseille</option>
                  <option>Nice</option>
                  <option>Aix-en-Provence</option>
                  <option>Paris</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Promotion</label>
                <select
                  name="promotion"
                  className="input-field"
                  value={formData.promotion}
                  onChange={handleChange}
                >
                  <option>Sélectionner votre promotion</option>
                  <option>Promo 2024</option>
                  <option>Promo 2025</option>
                  <option>Promo 2026</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Email professionnel</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="prenom.nom@laplateforme.io"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Mot de passe</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Mot de passe</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type="password"
                    name="passwordConfirm"
                    className="input-field"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Link to="/dashboard" className="btn btn-primary auth-submit">
                S'inscrire
              </Link>
            </form>
          )}
        </div>

        <p className="auth-footer">Réservé aux étudiants CDPI de La Plateforme</p>
      </div>
    </div>
  );
};

export default Login;

