import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { authService } from '../services/authService';
import './Auth.css';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Token de vérification manquant.');
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Votre email a été vérifié avec succès ! Vous pouvez maintenant vous connecter.');
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Erreur lors de la vérification de l\'email.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '500px' }}>
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo">
                <Mail size={40} style={{ color: 'white' }} />
              </div>
            </div>
            <h1 className="auth-title">Vérification d'email</h1>
          </div>

          {status === 'loading' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>Vérification en cours...</div>
            </div>
          )}

          {status === 'success' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <CheckCircle size={64} style={{ color: '#10b981', marginBottom: '1rem' }} />
              <p style={{ marginBottom: '2rem', color: '#10b981' }}>{message}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
                style={{ width: '100%' }}
              >
                Se connecter
              </button>
            </div>
          )}

          {status === 'error' && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <XCircle size={64} style={{ color: '#ef4444', marginBottom: '1rem' }} />
              <p style={{ marginBottom: '2rem', color: '#ef4444' }}>{message}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
                style={{ width: '100%' }}
              >
                Retour à la connexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
