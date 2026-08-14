export const formatMinute = (minute, extra) => {
  if (!minute && minute !== 0) return '—';
  return extra ? `${minute}+${extra}'` : `${minute}'`;
};

export const formatScore = (score) => score ?? 'TBD';

export const formatKickoff = (dateString) => {
  if (!dateString) return 'TBD';
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};

export const formatMatchDate = (dateString) => {
  if (!dateString) return 'Date TBD';
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};

export const isLiveStatus = (status) => ['1H', '2H', 'HT', 'ET', 'P', 'LIVE', 'BT'].includes(status);

export const isNavigableMatchId = (id) => id != null && String(id).length > 0;
