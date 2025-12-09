import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {!sidebarOpen && (
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

