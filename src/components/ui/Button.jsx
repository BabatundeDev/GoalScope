import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sizeClasses = {
  sm: 'btn-gs--sm',
  md: 'btn-gs--md',
  lg: 'btn-gs--lg'
};

const variantClasses = {
  primary: 'btn-gs--primary',
  secondary: 'btn-gs--secondary',
  ghost: 'btn-gs--ghost',
  danger: 'btn-gs--danger'
};

/**
 * Unified button system — consistent sizing, contrast, focus rings, and hover elevation.
 * Use `to` for router links; keeps CTA patterns maintainable across pages.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  iconRight: IconRight,
  onClick,
  ...rest
}) => {
  const classes = ['btn-gs', variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(' ');

  const content = (
    <>
      {Icon ? <Icon size={size === 'sm' ? 14 : 16} aria-hidden="true" /> : null}
      <span>{children}</span>
      {IconRight ? <IconRight size={size === 'sm' ? 14 : 16} aria-hidden="true" /> : null}
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={disabled ? undefined : { y: -1 }} whileTap={disabled ? undefined : { scale: 0.98 }} className="btn-gs-wrap">
        <Link to={to} className={classes} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} {...rest}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div whileHover={disabled ? undefined : { y: -1 }} whileTap={disabled ? undefined : { scale: 0.98 }} className="btn-gs-wrap">
        <a href={href} className={classes} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} {...rest}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...rest}
    >
      {content}
    </motion.button>
  );
};

export default Button;
