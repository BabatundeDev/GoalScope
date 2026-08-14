import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CircleDotIcon, MapPinIcon } from './Icon';
import { formatKickoff, formatMinute, formatScore, isLiveStatus, isNavigableMatchId } from '../../utils/formatters';

/** Clickable match card — home vs away with centered score (flagship sports layout). */
const MatchCard = ({ match }) => {
  const navigable = isNavigableMatchId(match.id);

  const content = (
    <>
      <div className="match-card__top">
        <div className={`match-card__status${isLiveStatus(match.status) ? ' is-live' : ''}`}>
          <CircleDotIcon size={12} /> {match.statusLong || match.status}
        </div>
        <span className="match-card__minute">
          {isLiveStatus(match.status) ? formatMinute(match.minute) : formatKickoff(match.date)}
        </span>
      </div>
      <p className="match-card__league">{match.league}</p>

      <div className="match-card__faceoff">
        <div className="match-card__team match-card__team--home">
          {match.homeLogo ? (
            <img src={match.homeLogo} alt="" className="team-logo team-logo--card" loading="lazy" />
          ) : (
            <span className="team-logo team-logo--card team-logo--placeholder" aria-hidden="true" />
          )}
          <span className="match-card__team-name">{match.homeTeam}</span>
        </div>

        <div className="match-card__score">
          <span className="score-badge score-badge--faceoff">{formatScore(match.score)}</span>
        </div>

        <div className="match-card__team match-card__team--away">
          {match.awayLogo ? (
            <img src={match.awayLogo} alt="" className="team-logo team-logo--card" loading="lazy" />
          ) : (
            <span className="team-logo team-logo--card team-logo--placeholder" aria-hidden="true" />
          )}
          <span className="match-card__team-name">{match.awayTeam}</span>
        </div>
      </div>

      <div className="match-card__footer">
        <span className="match-card__venue"><MapPinIcon size={13} /> {match.venue}</span>
        {navigable ? (
          <span className="match-card__link">View details <ArrowRightIcon size={14} /></span>
        ) : null}
      </div>
    </>
  );

  if (!navigable) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="match-card"
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="match-card-wrap"
    >
      <Link
        to={`/matches/${match.id}`}
        className="match-card-link"
        aria-label={`View ${match.homeTeam} vs ${match.awayTeam} match details`}
      >
        <article className="match-card match-card--interactive">{content}</article>
      </Link>
    </motion.div>
  );
};

export default MatchCard;
