import { Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import StatCard from '../components/ui/StatCard';
import DashboardCard from '../components/ui/DashboardCard';
import { useHomeOverview } from '../hooks/useHomeOverview';

const AnalyticsPage = () => {
  const { data, loading, isFallback } = useHomeOverview();

  const dashboardStats = data?.dashboardStats ?? [];
  const liveCount = data?.live.matches?.length ?? 0;
  const todayCount = data?.today.total ?? data?.today.fixtures?.length ?? 0;
  const standings = data?.standings.standings ?? [];
  const topTeams = standings.slice(0, 3);

  const momentumBreakdown = [
    { label: 'Live coverage', value: Math.min(100, liveCount * 12) },
    { label: 'Daily schedule depth', value: Math.min(100, todayCount * 4) },
    { label: 'Table competitiveness', value: standings.length ? 72 : 0 },
    { label: 'Goal output today', value: Math.min(100, Number(dashboardStats[2]?.value ?? 0) * 8) }
  ];

  return (
    <motion.section
      className="page-hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="py-5">
        <SectionHeading
          eyebrow="Analytics"
          title="A deeper look at the game’s momentum"
          description="Derived from live fixtures, today’s schedule, and Premier League standings via API-Football."
          action={<span className="section-pill">{isFallback ? 'Preview data' : 'Live API'}</span>}
        />

        {loading ? (
          <div className="metric-tile loading-state mb-4">Loading analytics…</div>
        ) : (
          <Row xs={1} md={2} lg={4} className="g-4 mb-4">
            {dashboardStats.map((snapshot) => (
              <Col key={snapshot.label}><StatCard {...snapshot} /></Col>
            ))}
          </Row>
        )}

        <div className="table-card">
          <h3 className="metric-value mb-3">Matchday momentum</h3>
          <div className="chart-stack">
            {momentumBreakdown.map((item) => (
              <div key={item.label} className="chart-row">
                <div className="d-flex justify-content-between align-items-center mb-2 gap-3">
                  <span className="section-copy mb-0">{item.label}</span>
                  <span className="metric-detail">{item.value}%</span>
                </div>
                <div className="chart-bar-track" role="presentation">
                  <div
                    className="chart-bar-fill"
                    style={{ width: `${item.value}%` }}
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.label} ${item.value} percent`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Row xs={1} md={2} className="g-4 mt-4">
          {topTeams[0] ? (
            <Col>
              <DashboardCard
                title="League leader"
                value={topTeams[0].team}
                detail={`${topTeams[0].points} points · Form ${topTeams[0].form || '—'}`}
                accent="linear-gradient(90deg, #0ea5e9, #22c55e)"
              />
            </Col>
          ) : null}
          {topTeams[1] ? (
            <Col>
              <DashboardCard
                title="Title challenger"
                value={topTeams[1].team}
                detail={`${topTeams[1].points} points · Form ${topTeams[1].form || '—'}`}
                accent="linear-gradient(90deg, #22c55e, #0ea5e9)"
              />
            </Col>
          ) : null}
        </Row>
      </Container>
    </motion.section>
  );
};

export default AnalyticsPage;
