/**
 * Inline football mark — used in navbar, hero badges, and anywhere a brand icon is needed.
 * Keeps colors on-brand without relying on external asset loading.
 */
const GoalScopeLogo = ({ size = 32, className = '', title = 'GoalScope' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    role="img"
    aria-label={title}
  >
    <defs>
      <linearGradient id="goalscope-ball-shine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="#08111F" />
    <circle cx="32" cy="32" r="22" fill="#F8FAFC" />
    <path
      d="M32 14l4.4 8.2 9.2 1.3-6.7 6.5 1.6 9.1-8.5-4.5-8.5 4.5 1.6-9.1-6.7-6.5 9.2-1.3L32 14z"
      fill="#08111F"
    />
    <path
      d="M32 14v9.2M32 40.8V50M14 32h9.2M40.8 32H50"
      stroke="url(#goalscope-ball-shine)"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="32" cy="32" r="22" fill="none" stroke="#0EA5E9" strokeWidth="1.2" opacity="0.35" />
  </svg>
);

export default GoalScopeLogo;
