import { useState } from 'react';
import { Send } from 'lucide-react';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Logique d'envoi de message
      console.log('Envoi du message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const messages = [
    {
      id: 1,
      author: 'Thomas Dubois',
      location: 'Aix-en-Provence',
      content: "Salut tout le monde ! Quelqu'un a des conseils pour le challenge de course ?",
      time: '14:32',
      isOwn: false
    },
    {
      id: 2,
      author: 'Sophie Lefebvre',
      location: 'Nice',
      content: "Oui ! Je te conseille de commencer doucement et d'augmenter progressivement.",
      time: '14:35',
      isOwn: false
    },
    {
      id: 3,
      author: 'Vous',
      location: '',
      content: "Je suis d'accord avec Sophie. L'important c'est la régularité !",
      time: '14:38',
      isOwn: true
    },
    {
      id: 4,
      author: 'Kevin Moreau',
      location: 'Marseille',
      content: 'Des volontaires pour former un groupe de travail sur le challenge de code ?',
      time: '14:42',
      isOwn: false
    },
    {
      id: 5,
      author: 'Laura Simon',
      location: 'Paris',
      content: 'Je serais intéressée ! On pourrait se retrouver cette semaine.',
      time: '14:45',
      isOwn: false
    },
  ];

  return (
    <div className="chat-page">
      <div className="page-header">
        <h1 className="page-title">Chat général</h1>
        <p className="page-subtitle">Échangez avec la communauté Inter-Ville</p>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isOwn ? 'message-own' : ''}`}>
              {!message.isOwn && (
                <div className="message-header">
                  <span className="message-author">{message.author}</span>
                  {message.location && (
                    <span className="message-location">{message.location}</span>
                  )}
                </div>
              )}
              <div className="message-bubble">
                <p className="message-content">{message.content}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
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
          <button className="chat-send-btn" onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

