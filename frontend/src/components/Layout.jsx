import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu quand on clique sur un lien ou en dehors
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fermer le menu avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="app-container">
      <button 
        className="menu-burger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={closeMenu}
        />
      )}
      
      <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

