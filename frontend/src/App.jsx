import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import CreateChallenge from './pages/CreateChallenge';
import ChallengeDetail from './pages/ChallengeDetail';
import Chat from './pages/Chat';
import Profil from './pages/Profil';
import Administration from './pages/Administration';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/challenges/new" element={<CreateChallenge />} />
                    <Route path="/challenges/:id" element={<ChallengeDetail />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/administration" element={<Administration />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
