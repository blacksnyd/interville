import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Trophy, MessageSquare, User, Shield, LogOut, X } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { path: '/challenges', label: 'Challenges', icon: Trophy },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/profil', label: 'Profil', icon: User },
    { path: '/administration', label: 'Administration', icon: Shield },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Gérer l'expansion au hover sur desktop et détecter mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsExpanded(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = () => {
    // Fermer la sidebar sur mobile après clic
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && isMobile && <div className="sidebar-overlay" onClick={onClose} />}
      
      <aside 
        className={`sidebar ${isMobile ? (isOpen ? 'open' : '') : 'open'} ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <div className="sidebar-logo-icon">IV</div>
            <div className="sidebar-logo-text">
              <h1 className="sidebar-logo">Inter-Ville</h1>
              <p className="sidebar-subtitle">CDPI La Plateforme</p>
            </div>
          </div>
          {isMobile && (
            <button className="sidebar-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={handleItemClick}
                title={item.label}
              >
                <span className="sidebar-icon">
                  <Icon size={22} />
                </span>
                <span className="sidebar-label">{item.label}</span>
                {isActive(item.path) && <span className="sidebar-indicator" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link 
            to="/login" 
            className="sidebar-item sidebar-logout"
            onClick={handleItemClick}
            title="Déconnexion"
          >
            <span className="sidebar-icon">
              <LogOut size={22} />
            </span>
            <span className="sidebar-label">Déconnexion</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

