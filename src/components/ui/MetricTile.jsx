import { motion } from 'framer-motion';

const MetricTile = ({ label, value, detail, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ duration: 0.25 }}
    className="metric-tile"
  >
    <div className="metric-tile__header">
      <span className="metric-tile__label">{label}</span>
      {Icon ? <Icon size={16} /> : null}
    </div>
    <div className="metric-tile__value">{value}</div>
    <p className="metric-tile__detail">{detail}</p>
  </motion.div>
);

export default MetricTile;
