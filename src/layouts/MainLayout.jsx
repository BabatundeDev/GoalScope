import { createElement, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BarChartIcon,
  CloseIcon,
  CompassIcon,
  MenuIcon,
  RadarIcon,
  ShieldIcon,
  StarIcon,
  TrophyIcon
} from '../components/ui/Icon';
import SearchBar from '../components/ui/SearchBar';
import { useFavorites } from '../hooks/useFavorites';

const navItems = [
  { to: '/matches', label: 'Matches', icon: CompassIcon },
  { to: '/leagues', label: 'Leagues', icon: TrophyIcon },
  { to: '/teams', label: 'Teams', icon: ShieldIcon },
  { to: '/players', label: 'Players', icon: RadarIcon },
  { to: '/analytics', label: 'Analytics', icon: BarChartIcon }
];

/**
 * Sticky glass navigation with active indicators and a dedicated mobile drawer.
 * Replaces Bootstrap Navbar for clearer hierarchy, keyboard focus, and responsive control.
 */
const MainLayout = ({ children }) => {
  const { favoriteCount } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="nav-inner">
          <Link to="/" className="brand-mark" aria-label="GoalScope home">
            <span className="brand-icon" aria-hidden="true">
              <img src="/goalscope-logo.svg" alt="" aria-hidden="true" />
            </span>
            <span className="brand-text">
              <span className="brand-name">GoalScope</span>
              <span className="brand-tag">Football analytics</span>
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {createElement(Icon, { size: 15 })}
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav-tools">
            <div className="nav-search">
              <SearchBar />
            </div>
            <div className="favorites-pill" title="Saved favorites">
              <StarIcon size={14} />
              <span>{favoriteCount}</span>
            </div>
            <button
              type="button"
              className="nav-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-nav"
              className="nav-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="nav-mobile__inner">
                <SearchBar />
                <nav className="nav-mobile__links" aria-label="Mobile">
                  {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) => `nav-link nav-link--block${isActive ? ' active' : ''}`}
                    >
                      {createElement(Icon, { size: 16 })}
                      <span>{label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="main-content" className="app-main">
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <img src="/goalscope-logo.svg" alt="" aria-hidden="true" />
              <h3 className="footer-title">GoalScope</h3>
            </div>
            <p className="footer-copy">
              Premium football intelligence powered by API-Football — live fixtures, standings, scorers, and match analytics.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/matches">Live</Link>
            <Link to="/analytics">Analytics</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
