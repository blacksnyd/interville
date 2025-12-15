import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    city: '',
    class: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Effacer l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Connexion
        await login({
          email: formData.email,
          password: formData.password
        });
        navigate('/dashboard');
      } else {
        // Inscription
        // Validation côté client
        if (formData.password !== formData.passwordConfirm) {
          setError('Les mots de passe ne correspondent pas');
          setLoading(false);
          return;
        }

        if (!formData.email.endsWith('@laplateforme.io')) {
          setError('Seuls les emails @laplateforme.io sont autorisés');
          setLoading(false);
          return;
        }

        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          class: formData.class
        });
        
        // Après l'inscription, afficher un message de succès
        setError('');
        alert('Inscription réussie ! Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.');
        setIsLogin(true); // Basculer vers le formulaire de connexion
        setFormData({
          email: '',
          password: '',
          passwordConfirm: '',
          username: '',
          city: '',
          class: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
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

          {isLogin ? (
            <form className="auth-form" onSubmit={handleSubmit}>
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
                    required
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
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Pseudo</label>
                <input
                  type="text"
                  name="username"
                  className="input-field"
                  placeholder="Votre pseudo"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Ville</label>
                <select
                  name="city"
                  className="input-field"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner votre ville</option>
                  <option value="2">Marseille</option>
                  <option value="4">Nice</option>
                  <option value="3">Aix-en-Provence</option>
                  <option value="1">Paris</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Promotion</label>
                <select
                  name="class"
                  className="input-field"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  <option disabled>Sélectionner votre promotion</option>
                  <option value="1">Promo 2024</option>
                  <option value="2">Promo 2025</option>
                  <option value="3">Promo 2026</option>
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
                    required
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
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Confirmer le mot de passe</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type="password"
                    name="passwordConfirm"
                    className="input-field"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </form>
          )}
        </div>

        <p className="auth-footer">Réservé aux étudiants CDPI de La Plateforme</p>
      </div>
    </div>
  );
};

export default Login;

