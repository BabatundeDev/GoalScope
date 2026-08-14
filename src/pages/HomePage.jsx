import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRightIcon, BarChartIcon, CircleDotIcon } from '../components/ui/Icon';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import StatCard from '../components/ui/StatCard';
import MatchCard from '../components/ui/MatchCard';
import DashboardCard from '../components/ui/DashboardCard';
import { useHomeOverview } from '../hooks/useHomeOverview';
import { formatKickoff, isNavigableMatchId } from '../utils/formatters';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.35 }
};

const HomePage = () => {
  const { data, loading, isFallback } = useHomeOverview();

  const liveMatches = data?.live.matches ?? [];
  const todayFixtures = data?.today.fixtures ?? [];
  const dashboardStats = data?.dashboardStats ?? [];
  const leagues = data?.leagues.leagues ?? [];
  const standings = data?.standings.standings ?? [];
  const trendingTeams = data?.trendingTeams ?? [];
  const topPlayers = data?.topPlayers ?? [];
  const liveCount = liveMatches.length;
  const todayCount = data?.today.total ?? todayFixtures.length;

  return (
    <>
      <section id="hero" className="hero-section">
        <Container className="py-4 py-lg-5">
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <p className="section-eyebrow mb-3">GoalScope · Football intelligence</p>
                <h1 className="hero-title">See the game beyond the final whistle.</h1>
                <p className="hero-copy">
                  Live fixtures, league standings, and match analytics powered by API-Football — built for analysts, coaches, journalists, and fans.
                </p>
                <div className="hero-actions mt-4">
                  <Button to="/matches" size="lg">Explore live matches</Button>
                  <Button to="/analytics" size="lg" variant="secondary">View analytics</Button>
                </div>
              </motion.div>
            </Col>
            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="hero-panel"
              >
                <div className="d-flex justify-content-between align-items-center mb-3 gap-2 flex-wrap">
                  <span className="section-eyebrow mb-0">Today’s football</span>
                  <span className="section-pill">
                    <img src="/goalscope-logo.svg" alt="" aria-hidden="true" className="section-pill__icon" />
                    {isFallback ? 'Preview mode' : 'Live feed'}
                  </span>
                </div>
                <h3>Real-time match intelligence from API-Football.</h3>
                <ul className="feature-list">
                  <li>{liveCount} live fixtures updating every 15 seconds</li>
                  <li>{todayCount} matches scheduled across global competitions</li>
                  <li>Click any match card to open full details, events, and stats</li>
                </ul>
                <div className="d-flex gap-3 mt-4 flex-wrap">
                  <div className="metric-tile grow">
                    <div className="metric-tile__header">
                      <span className="metric-tile__label">Live now</span>
                      <CircleDotIcon size={14} />
                    </div>
                    <div className="metric-tile__value">
                      {loading ? '—' : <CountUp end={liveCount} duration={1.1} />}
                    </div>
                    <p className="metric-tile__detail">Active fixtures</p>
                  </div>
                  <div className="metric-tile grow">
                    <div className="metric-tile__header">
                      <span className="metric-tile__label">Kick-offs</span>
                      <BarChartIcon size={14} />
                    </div>
                    <div className="metric-tile__value">
                      {loading ? '—' : <CountUp end={todayCount} duration={1.1} />}
                    </div>
                    <p className="metric-tile__detail">Scheduled today</p>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <motion.section className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Dashboard statistics"
            title="The numbers that shape the day"
            description="Aggregated from live fixtures and today’s schedule via API-Football."
            action={<span className="section-pill">{isFallback ? 'Preview data' : 'Live API connected'}</span>}
          />
          {loading ? (
            <div className="metric-tile loading-state">Loading dashboard…</div>
          ) : (
            <Row xs={1} md={2} lg={4} className="g-4">
              {dashboardStats.map((stat) => (
                <Col key={stat.label}><StatCard {...stat} /></Col>
              ))}
            </Row>
          )}
        </Container>
      </motion.section>

      <motion.section id="live-matches" className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Live matches"
            title="The pulse of the current day"
            description="Tap any card to open match details, timeline events, and team statistics."
            action={<span className="section-pill">{liveCount} live</span>}
          />
          {loading ? (
            <div className="metric-tile loading-state">Loading live fixtures…</div>
          ) : liveMatches.length ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {liveMatches.map((match) => (
                <Col key={match.id}><MatchCard match={match} /></Col>
              ))}
            </Row>
          ) : (
            <div className="metric-tile loading-state">No live matches right now. Check today’s fixtures below.</div>
          )}
        </Container>
      </motion.section>

      <motion.section className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Featured leagues"
            title="Top competitions in focus"
            description="Current-season coverage from Europe’s major leagues."
          />
          <Row xs={1} md={2} lg={4} className="g-4">
            {leagues.map((competition) => (
              <Col key={competition.id}>
                <DashboardCard
                  title={competition.country}
                  value={competition.name}
                  detail={`Season ${competition.season}`}
                  accent="linear-gradient(90deg, #0ea5e9, #22c55e)"
                >
                  {competition.logo ? (
                    <img src={competition.logo} alt="" className="league-logo league-logo--inline" loading="lazy" />
                  ) : null}
                </DashboardCard>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      <motion.section className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Today’s fixtures"
            title="Key games and kickoff times"
            description="Sorted by major leagues — pulled from today’s API-Football schedule."
          />
          <div className="table-card">
            {todayFixtures.length ? todayFixtures.map((fixture) => {
              const row = (
                <>
                  <div>
                    <p className="section-eyebrow mb-1">{fixture.league}</p>
                    <h4 className="fixture-title">{fixture.homeTeam} vs {fixture.awayTeam}</h4>
                  </div>
                  <div className="fixture-time">{formatKickoff(fixture.date)}</div>
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
              <div className="loading-state">No fixtures scheduled for today.</div>
            )}
          </div>
        </Container>
      </motion.section>

      <motion.section id="standings" className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Premier League standings"
            title="Quick access to the table leaders"
            description={data?.standings.leagueName ? `Current ${data.standings.leagueName} table from API-Football.` : 'League table snapshot.'}
          />
          <div className="table-card">
            <div className="standings-headings">
              <span>#</span><span>Team</span><span>Played</span><span>Points</span>
            </div>
            {standings.length ? standings.map((entry) => (
              <div key={entry.team} className="standings-row">
                <span>{entry.position}</span>
                <span className="standings-team">
                  {entry.teamLogo ? <img src={entry.teamLogo} alt="" className="team-logo team-logo--sm" loading="lazy" /> : null}
                  {entry.team}
                </span>
                <span>{entry.played}</span>
                <span>{entry.points}</span>
              </div>
            )) : (
              <div className="loading-state">Standings unavailable.</div>
            )}
          </div>
        </Container>
      </motion.section>

      <motion.section className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Top of the table"
            title="The clubs leading the charge"
            description="Form strings from the current Premier League standings."
          />
          <Row xs={1} md={3} className="g-4">
            {trendingTeams.map((team) => (
              <Col key={team.name}>
                <DashboardCard title="Recent form" value={team.name} detail={team.form} accent={team.accent} />
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      <motion.section id="players" className="section-block" {...fadeUp}>
        <Container>
          <SectionHeading
            eyebrow="Top scorers"
            title="The names fans want to track"
            description="Premier League goal leaders from the current season."
          />
          <Row xs={1} md={3} className="g-4">
            {topPlayers.map((player) => (
              <Col key={player.name}>
                <DashboardCard
                  title={player.club}
                  value={player.name}
                  detail={player.stat}
                  accent="linear-gradient(90deg, #22c55e, #0ea5e9)"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      <motion.section className="section-block" {...fadeUp}>
        <Container>
          <div className="table-card cta-banner">
            <div>
              <p className="section-eyebrow mb-2">Next step</p>
              <h3>Open match details or explore analytics for deeper context.</h3>
            </div>
            <Button to="/matches" variant="secondary" iconRight={ArrowRightIcon}>
              Go to match center
            </Button>
          </div>
        </Container>
      </motion.section>
    </>
  );
};

export default HomePage;
