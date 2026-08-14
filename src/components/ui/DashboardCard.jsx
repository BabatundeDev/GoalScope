import { motion } from 'framer-motion';
import { StarIcon } from './Icon';
import { useFavorites } from '../../hooks/useFavorites';

/** Favoritable entity card — accent rail + soft elevation for a denser analytics feel. */
const DashboardCard = ({ title, value, detail, accent, children, type, item }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = item ? isFavorite(type, item) : false;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24 }}
      className="dashboard-card"
    >
      <div className="card-accent" style={{ background: accent }} />
      <div className="dashboard-card__body">
        <div className="dashboard-card__top">
          <p className="dashboard-card__title">{title}</p>
          {item ? (
            <button
              type="button"
              className={`favorite-toggle${active ? ' active' : ''}`}
              onClick={() => toggleFavorite(type, item)}
              aria-pressed={active}
              aria-label={`${active ? 'Remove' : 'Save'} ${value} as favorite`}
            >
              <StarIcon size={14} />
            </button>
          ) : null}
        </div>
        <h3 className="dashboard-card__value">{value}</h3>
        {detail ? <p className="dashboard-card__detail">{detail}</p> : null}
        {children ? <div className="dashboard-card__detail mt-1">{children}</div> : null}
      </div>
    </motion.article>
  );
};

export default DashboardCard;
