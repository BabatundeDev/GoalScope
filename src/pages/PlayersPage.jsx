import { Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import DashboardCard from '../components/ui/DashboardCard';
import { useTopScorersData } from '../hooks/useLeagueData';

const PlayersPage = () => {
  const { scorers, loading, isFallback } = useTopScorersData(39, 8);

  return (
    <motion.section
      className="page-hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="py-5">
        <SectionHeading
          eyebrow="Players"
          title="The names shaping the season"
          description="Premier League top scorers with goals, assists, and appearances from API-Football."
          action={<span className="section-pill">{isFallback ? 'Preview data' : 'Live API'}</span>}
        />
        {loading ? (
          <div className="metric-tile loading-state">Loading players…</div>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {scorers.map((player) => (
              <Col key={player.id ?? player.name}>
                <DashboardCard
                  title={player.club}
                  value={player.name}
                  detail={`${player.goals} goals · ${player.assists} assists · ${player.appearances} apps`}
                  accent="linear-gradient(90deg, #22c55e, #0ea5e9)"
                  type="players"
                  item={{ id: player.name, name: player.name }}
                >
                  <div className="d-flex align-items-center gap-2 mt-1">
                    {player.photo ? <img src={player.photo} alt="" className="player-photo" loading="lazy" /> : null}
                    {player.clubLogo ? <img src={player.clubLogo} alt="" className="team-logo" loading="lazy" /> : null}
                  </div>
                </DashboardCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </motion.section>
  );
};

export default PlayersPage;
