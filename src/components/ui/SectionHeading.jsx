import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="section-heading">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24 }}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{description}</p>
    </motion.div>
    {action ? <div className="section-action">{action}</div> : null}
  </div>
);

export default SectionHeading;
