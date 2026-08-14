import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import MatchCard from '../components/ui/MatchCard';
import DashboardCard from '../components/ui/DashboardCard';
import { useFootballData } from '../hooks/useFootballData';
import { useTodayFixtures } from '../hooks/useTodayFixtures';
import { formatKickoff, isNavigableMatchId } from '../utils/formatters';

const MatchCenterPage = () => {
  const { matches, loading, isFallback } = useFootballData();
  const { fixtures, loading: fixturesLoading } = useTodayFixtures(12);

  return (
    <>
      <section className="page-hero">
        <Container className="py-5">
          <SectionHeading
            eyebrow="Match center"
            title="Follow the action with richer context"
            description="Live fixtures refresh every 15 seconds. Select any match to view events, statistics, and full details."
            action={<span className="section-pill">{isFallback ? 'Preview data' : `${matches.length} live`}</span>}
          />
          {loading ? (
            <div className="metric-tile loading-state">Loading live fixtures…</div>
          ) : matches.length ? (
            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
              {matches.map((match) => (
                <Col key={match.id}><MatchCard match={match} /></Col>
              ))}
            </Row>
          ) : (
            <div className="metric-tile loading-state">No live matches at the moment. Browse today’s schedule below.</div>
          )}
        </Container>
      </section>

      <motion.section
        className="section-block"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35 }}
      >
        <Container>
          <SectionHeading
            eyebrow="Today’s schedule"
            title="Upcoming and finished fixtures"
            description="Major-league fixtures from today’s API-Football calendar — click any row to open match details."
          />
          <div className="table-card">
            {fixturesLoading ? (
              <div className="loading-state">Loading today’s fixtures…</div>
            ) : fixtures.length ? fixtures.map((fixture) => {
              const row = (
                <>
                  <div>
                    <p className="section-eyebrow mb-1">{fixture.league}</p>
                    <h4 className="fixture-title">{fixture.homeTeam} vs {fixture.awayTeam}</h4>
                  </div>
                  <div className="fixture-time">{formatKickoff(fixture.date)} · {fixture.status}</div>
                </>
              );

              return isNavigableMatchId(fixture.id) ? (
                <Link key={fixture.id} to={`/matches/${fixture.id}`} className="fixture-row fixture-row--link">
                  {row}
                </Link>
              ) : (
                <div key={`${fixture.date}-${fixture.homeTeam}`} className="fixture-row">{row}</div>
              );
            }) : (
              <div className="loading-state">No fixtures found for today.</div>
            )}
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="section-block"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35 }}
      >
        <Container>
          <SectionHeading
            eyebrow="How to use"
            title="Every match card is interactive"
            description="Click a live or scheduled fixture to open the dedicated match detail view with timeline and stats."
          />
          <Row xs={1} md={3} className="g-4">
            <Col><DashboardCard title="Step 1" value="Pick a match" detail="Browse live fixtures or today’s schedule." accent="linear-gradient(90deg, #0ea5e9, #22c55e)" /></Col>
            <Col><DashboardCard title="Step 2" value="View details" detail="See score, venue, referee, and match status." accent="linear-gradient(90deg, #22c55e, #0ea5e9)" /></Col>
            <Col><DashboardCard title="Step 3" value="Analyze" detail="Review events timeline and team statistics." accent="linear-gradient(90deg, #0ea5e9, #f59e0b)" /></Col>
          </Row>
        </Container>
      </motion.section>
    </>
  );
};

export default MatchCenterPage;
