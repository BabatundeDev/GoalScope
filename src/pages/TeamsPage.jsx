import { Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import DashboardCard from '../components/ui/DashboardCard';
import { useStandingsData } from '../hooks/useLeagueData';

const TeamsPage = () => {
  const { standings, leagueName, loading, isFallback } = useStandingsData(39);

  return (
    <motion.section
      className="page-hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="py-5">
        <SectionHeading
          eyebrow="Teams"
          title="Explore the clubs driving today’s stories"
          description={`Current ${leagueName} table leaders and form strings from API-Football.`}
          action={<span className="section-pill">{isFallback ? 'Preview data' : 'Live API'}</span>}
        />
        {loading ? (
          <div className="metric-tile loading-state">Loading teams…</div>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {standings.map((team) => (
              <Col key={team.team}>
                <DashboardCard
                  title={`#${team.position} · ${leagueName}`}
                  value={team.team}
                  detail={`${team.points} pts · ${team.played} played · Form: ${team.form || '—'}`}
                  accent="linear-gradient(90deg, #0ea5e9, #22c55e)"
                  type="teams"
                  item={{ id: team.team, name: team.team }}
                >
                  {team.teamLogo ? (
                    <img src={team.teamLogo} alt="" className="team-logo league-logo--inline" loading="lazy" />
                  ) : null}
                  {`GF ${team.goalsFor} · GA ${team.goalsAgainst}`}
                </DashboardCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </motion.section>
  );
};

export default TeamsPage;
