import { HashRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MatchCenterPage from './pages/MatchCenterPage';
import MatchDetailPage from './pages/MatchDetailPage';
import LeaguesPage from './pages/LeaguesPage';
import TeamsPage from './pages/TeamsPage';
import PlayersPage from './pages/PlayersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { QueryProvider } from './lib/queryClient';
import './App.css';

const App = () => (
  <QueryProvider>
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<MatchCenterPage />} />
          <Route path="/matches/:matchId" element={<MatchDetailPage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#f8fafc',
            border: '1px solid rgba(148,163,184,0.18)',
            borderRadius: '0.85rem',
            fontFamily: '"Plus Jakarta Sans", sans-serif'
          }
        }}
      />
    </HashRouter>
  </QueryProvider>
);

export default App;
