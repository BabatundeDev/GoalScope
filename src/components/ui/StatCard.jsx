import { motion } from 'framer-motion';

const StatCard = ({ label, value, detail }) => (
  <motion.article
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.24 }}
    className="feature-card"
  >
    <p className="metric-label">{label}</p>
    <h3 className="metric-value">{value}</h3>
    <p className="metric-detail">{detail}</p>
  </motion.article>
);

export default StatCard;
