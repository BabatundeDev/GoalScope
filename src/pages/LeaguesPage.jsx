import { Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import DashboardCard from '../components/ui/DashboardCard';
import { useLeaguesData } from '../hooks/useLeagueData';

const LeaguesPage = () => {
  const { leagues, loading, isFallback } = useLeaguesData();

  return (
    <motion.section
      className="page-hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="py-5">
        <SectionHeading
          eyebrow="Leagues"
          title="The competitions that shape the calendar"
          description="Current-season leagues from API-Football — Premier League, La Liga, Bundesliga, and Serie A."
          action={<span className="section-pill">{isFallback ? 'Preview data' : 'Live API'}</span>}
        />
        {loading ? (
          <div className="metric-tile loading-state">Loading leagues…</div>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {leagues.map((league) => (
              <Col key={league.id}>
                <DashboardCard
                  title={league.country}
                  value={league.name}
                  detail={`Season ${league.season}`}
                  accent="linear-gradient(90deg, #0ea5e9, #22c55e)"
                  type="leagues"
                  item={{ id: league.name, name: league.name }}
                >
                  {league.logo ? <img src={league.logo} alt="" className="league-logo league-logo--inline" loading="lazy" /> : null}
                </DashboardCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </motion.section>
  );
};

export default LeaguesPage;
