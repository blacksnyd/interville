import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { chatService } from '../services/chatService';
import './Chat.css';

const Chat = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const loadMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await chatService.getMessages();
      setMessages(data);
    } catch (err) {
      console.error('Erreur de chargement des messages:', err);
      setError(err.message || 'Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    setError('');
    try {
      const newMsg = await chatService.sendMessage(message.trim());
      setMessage('');
      // Ajouter le nouveau message à la liste
      setMessages((prev) => [...prev, newMsg]);
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      setError(err.message || "Erreur lors de l'envoi du message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <div className="page-header">
        <h1 className="page-title">Chat général</h1>
        <p className="page-subtitle">Échangez avec la communauté Inter-Ville</p>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
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
            <div style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
              Chargement des messages...
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
              Aucun message pour le moment. Soyez le premier à écrire !
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = user && msg.user && msg.user.id === user.id;
              return (
                <div
                  key={msg.id}
                  className={`message ${isOwn ? 'message-own' : ''}`}
                >
                  {!isOwn && (
                    <div className="message-header">
                      <span className="message-author">
                        {msg.user?.username || 'Utilisateur'}
                      </span>
                      {msg.user?.city && (
                        <span className="message-location">{msg.user.city}</span>
                      )}
                    </div>
                  )}
                  <div className="message-bubble">
                    <p className="message-content">{msg.content}</p>
                    <span className="message-time">
                      {formatTime(msg.created_at)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Tapez votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={sending || !message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

