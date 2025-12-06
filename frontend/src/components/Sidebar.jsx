import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Trophy, MessageSquare, User, Shield, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

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

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Inter-Ville</h1>
        <p className="sidebar-subtitle">CDPI La Plateforme</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="sidebar-icon">
                <Icon size={20} />
              </span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-item sidebar-logout">
          <span className="sidebar-icon">
            <LogOut size={20} />
          </span>
          <span className="sidebar-label">Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

