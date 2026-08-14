import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { CircleDotIcon, MapPinIcon } from '../components/ui/Icon';
import { useMatchDetail } from '../hooks/useMatchDetail';
import {
  formatKickoff,
  formatMatchDate,
  formatMinute,
  formatScore,
  isLiveStatus
} from '../utils/formatters';

const statLabels = {
  'Shots on Goal': 'Shots on target',
  'Total Shots': 'Total shots',
  'Ball Possession': 'Possession',
  'Corner Kicks': 'Corners',
  'Fouls': 'Fouls',
  'Yellow Cards': 'Yellow cards',
  'Red Cards': 'Red cards',
  'Goalkeeper Saves': 'Saves',
  'expected_goals': 'Expected goals'
};

const MatchDetailPage = () => {
  const { matchId } = useParams();
  const { match, events, statistics, loading, isFallback } = useMatchDetail(matchId);

  if (loading) {
    return (
      <section className="page-hero">
        <Container className="py-5">
          <div className="metric-tile loading-state">Loading match details…</div>
        </Container>
      </section>
    );
  }

  if (!match) {
    return (
      <section className="page-hero">
        <Container className="py-5">
          <SectionHeading
            eyebrow="Match center"
            title="Match not found"
            description="This fixture may have ended or the ID is invalid."
          />
          <Button to="/matches" variant="secondary">Back to matches</Button>
        </Container>
      </section>
    );
  }

  const homeStats = statistics[0]?.stats ?? {};
  const awayStats = statistics[1]?.stats ?? {};
  const statKeys = [...new Set([...Object.keys(homeStats), ...Object.keys(awayStats)])].slice(0, 8);

  return (
    <motion.section
      className="page-hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="py-5">
        <div className="match-detail-nav">
          <Button to="/matches" variant="secondary" size="sm">← Back to matches</Button>
          {isFallback ? <span className="section-pill">Preview data</span> : <span className="section-pill">Live API</span>}
        </div>

        <div className="match-detail-header table-card">
          <div className="match-detail-league">
            {match.leagueLogo ? <img src={match.leagueLogo} alt="" className="league-logo" /> : null}
            <div>
              <p className="section-eyebrow mb-1">{match.country || match.league}</p>
              <p className="match-detail-round">{match.round || match.league}</p>
            </div>
          </div>

          <div className="match-detail-scoreboard">
            <div className="match-detail-team">
              {match.homeLogo ? <img src={match.homeLogo} alt="" className="team-logo team-logo--lg" /> : null}
              <h2>{match.homeTeam}</h2>
            </div>

            <div className="match-detail-center">
              <div className={`match-detail-status${isLiveStatus(match.status) ? ' is-live' : ''}`}>
                <CircleDotIcon size={14} />
                {match.statusLong || match.status}
              </div>
              <div className="match-detail-score">{formatScore(match.score)}</div>
              <div className="match-detail-clock">
                {isLiveStatus(match.status) ? formatMinute(match.minute) : formatKickoff(match.date)}
              </div>
            </div>

            <div className="match-detail-team">
              {match.awayLogo ? <img src={match.awayLogo} alt="" className="team-logo team-logo--lg" /> : null}
              <h2>{match.awayTeam}</h2>
            </div>
          </div>

          <div className="match-detail-meta">
            <span><MapPinIcon size={14} /> {match.venue}{match.city ? `, ${match.city}` : ''}</span>
            <span>Referee: {match.referee}</span>
            <span>{formatMatchDate(match.date)}</span>
          </div>
        </div>

        {events.length ? (
          <div className="table-card mt-4">
            <h3 className="metric-value mb-3">Match timeline</h3>
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-row">
                  <span className="event-minute">{formatMinute(event.minute, event.extra)}</span>
                  <div className="event-body">
                    <span className="event-type">{event.detail || event.type}</span>
                    <strong>{event.player}</strong>
                    {event.assist ? <span className="event-assist">Assist: {event.assist}</span> : null}
                    <span className="event-team">{event.team}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {statKeys.length ? (
          <div className="table-card mt-4">
            <h3 className="metric-value mb-3">Team statistics</h3>
            <div className="stats-comparison">
              {statKeys.map((key) => (
                <div key={key} className="stat-compare-row">
                  <span className="stat-value">{homeStats[key] ?? '—'}</span>
                  <span className="stat-label">{statLabels[key] ?? key}</span>
                  <span className="stat-value">{awayStats[key] ?? '—'}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="match-detail-actions mt-4">
          <Button to="/matches" variant="secondary">All live matches</Button>
          <Link to="/analytics" className="btn-gs btn-gs--ghost btn-gs--md">View analytics</Link>
        </div>
      </Container>
    </motion.section>
  );
};

export default MatchDetailPage;
