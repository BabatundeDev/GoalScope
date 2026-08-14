const API_BASE = 'https://v3.football.api-sports.io';

const FEATURED_LEAGUE_IDS = [39, 140, 78, 135];
const MAJOR_LEAGUE_IDS = new Set([39, 140, 78, 135, 61, 2, 3]);

const fallbackMatches = [
  {
    id: 'fallback-1',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    league: 'Premier League',
    leagueId: 39,
    minute: 67,
    score: '2:1',
    homeGoals: 2,
    awayGoals: 1,
    status: 'Live',
    statusLong: 'Second Half',
    venue: 'Etihad Stadium',
    date: new Date().toISOString()
  },
  {
    id: 'fallback-2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'LaLiga',
    leagueId: 140,
    minute: 42,
    score: '1:1',
    homeGoals: 1,
    awayGoals: 1,
    status: 'Live',
    statusLong: 'First Half',
    venue: 'Santiago Bernabéu',
    date: new Date().toISOString()
  },
  {
    id: 'fallback-3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    league: 'Bundesliga',
    leagueId: 78,
    minute: 31,
    score: '0:0',
    homeGoals: 0,
    awayGoals: 0,
    status: 'Live',
    statusLong: 'First Half',
    venue: 'Allianz Arena',
    date: new Date().toISOString()
  }
];

const getApiKey = () => import.meta.env.VITE_API_FOOTBALL_KEY?.trim() ?? '';

export const getCurrentSeason = () => {
  const now = new Date();
  return now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
};

const getTodayDate = () => new Date().toISOString().split('T')[0];

const apiFetch = async (path) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'x-apisports-key': apiKey }
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors && Object.keys(payload.errors).length > 0) {
    throw new Error(Object.values(payload.errors).join(' '));
  }

  return payload;
};

export const normalizeMatch = (match) => {
  const homeGoals = match.goals?.home;
  const awayGoals = match.goals?.away;

  return {
    id: match.fixture?.id,
    homeTeam: match.teams?.home?.name ?? 'Home',
    awayTeam: match.teams?.away?.name ?? 'Away',
    homeLogo: match.teams?.home?.logo ?? null,
    awayLogo: match.teams?.away?.logo ?? null,
    league: match.league?.name ?? 'League',
    leagueId: match.league?.id,
    leagueLogo: match.league?.logo ?? null,
    country: match.league?.country ?? '',
    minute: match.fixture?.status?.elapsed ?? 0,
    homeGoals,
    awayGoals,
    score: homeGoals != null && awayGoals != null ? `${homeGoals}:${awayGoals}` : 'TBD',
    status: match.fixture?.status?.short ?? 'NS',
    statusLong: match.fixture?.status?.long ?? '',
    venue: match.fixture?.venue?.name ?? 'Venue TBD',
    city: match.fixture?.venue?.city ?? '',
    date: match.fixture?.date ?? null,
    referee: match.fixture?.referee ?? 'TBD',
    round: match.league?.round ?? ''
  };
};

const sortByLeaguePriority = (a, b) => {
  const aPriority = MAJOR_LEAGUE_IDS.has(a.leagueId) ? 0 : 1;
  const bPriority = MAJOR_LEAGUE_IDS.has(b.leagueId) ? 0 : 1;
  if (aPriority !== bPriority) return aPriority - bPriority;
  return new Date(a.date) - new Date(b.date);
};

export const getLiveMatches = async (limit = 12) => {
  if (!getApiKey()) {
    return { matches: fallbackMatches, isFallback: true };
  }

  try {
    const payload = await apiFetch('/fixtures?live=all');
    const matches = (payload?.response ?? []).map(normalizeMatch).slice(0, limit);
    return { matches, isFallback: false, total: payload?.results ?? matches.length };
  } catch (error) {
    console.warn('Falling back to preview live data', error);
    return { matches: fallbackMatches, isFallback: true };
  }
};

export const getTodayFixtures = async (limit = 10) => {
  if (!getApiKey()) {
    return { fixtures: [], isFallback: true };
  }

  try {
    const payload = await apiFetch(`/fixtures?date=${getTodayDate()}`);
    const fixtures = (payload?.response ?? [])
      .map(normalizeMatch)
      .sort(sortByLeaguePriority)
      .slice(0, limit);

    return { fixtures, isFallback: false, total: payload?.results ?? fixtures.length };
  } catch (error) {
    console.warn('Unable to load today fixtures', error);
    return { fixtures: [], isFallback: true, total: 0 };
  }
};

export const getMatchById = async (matchId) => {
  if (String(matchId).startsWith('fallback')) {
    const fallback = fallbackMatches.find((item) => item.id === matchId) ?? fallbackMatches[0];
    return { match: fallback, isFallback: true };
  }

  if (!getApiKey() || !matchId) {
    return { match: null, isFallback: true };
  }

  try {
    const payload = await apiFetch(`/fixtures?id=${matchId}`);
    const match = payload?.response?.[0];
    if (!match) throw new Error('Match not found');
    return { match: normalizeMatch(match), isFallback: false };
  } catch (error) {
    console.warn('Unable to load match', error);
    return { match: null, isFallback: true };
  }
};

export const getMatchEvents = async (matchId) => {
  if (!getApiKey() || String(matchId).startsWith('fallback')) {
    return { events: [], isFallback: true };
  }

  try {
    const payload = await apiFetch(`/fixtures/events?fixture=${matchId}`);
    const events = (payload?.response ?? []).map((event) => ({
      id: `${event.time?.elapsed}-${event.player?.id}-${event.type}`,
      minute: event.time?.elapsed ?? 0,
      extra: event.time?.extra,
      team: event.team?.name ?? '',
      teamLogo: event.team?.logo ?? null,
      player: event.player?.name ?? 'Unknown',
      assist: event.assist?.name ?? null,
      type: event.type ?? '',
      detail: event.detail ?? ''
    }));
    return { events, isFallback: false };
  } catch (error) {
    console.warn('Unable to load match events', error);
    return { events: [], isFallback: true };
  }
};

export const getMatchStatistics = async (matchId) => {
  if (!getApiKey() || String(matchId).startsWith('fallback')) {
    return { statistics: [], isFallback: true };
  }

  try {
    const payload = await apiFetch(`/fixtures/statistics?fixture=${matchId}`);
    const statistics = (payload?.response ?? []).map((entry) => ({
      team: entry.team?.name ?? '',
      teamLogo: entry.team?.logo ?? null,
      stats: (entry.statistics ?? []).reduce((acc, stat) => {
        acc[stat.type] = stat.value;
        return acc;
      }, {})
    }));
    return { statistics, isFallback: false };
  } catch (error) {
    console.warn('Unable to load match statistics', error);
    return { statistics: [], isFallback: true };
  }
};

export const getFeaturedLeagues = async () => {
  const fallback = [
    { id: 39, name: 'Premier League', country: 'England', logo: null, season: getCurrentSeason() },
    { id: 140, name: 'La Liga', country: 'Spain', logo: null, season: getCurrentSeason() },
    { id: 78, name: 'Bundesliga', country: 'Germany', logo: null, season: getCurrentSeason() },
    { id: 135, name: 'Serie A', country: 'Italy', logo: null, season: getCurrentSeason() }
  ];

  if (!getApiKey()) {
    return { leagues: fallback, isFallback: true };
  }

  try {
    const season = getCurrentSeason();
    const results = await Promise.all(
      FEATURED_LEAGUE_IDS.map(async (id) => {
        const payload = await apiFetch(`/leagues?id=${id}&season=${season}`);
        const league = payload?.response?.[0]?.league;
        const country = payload?.response?.[0]?.country?.name ?? '';
        return league
          ? { id: league.id, name: league.name, country, logo: league.logo, season }
          : null;
      })
    );

    const leagues = results.filter(Boolean);
    return { leagues: leagues.length ? leagues : fallback, isFallback: !leagues.length };
  } catch (error) {
    console.warn('Unable to load leagues', error);
    return { leagues: fallback, isFallback: true };
  }
};

export const getStandings = async (leagueId = 39) => {
  if (!getApiKey()) {
    return { standings: [], leagueName: 'Premier League', isFallback: true };
  }

  try {
    const season = getCurrentSeason();
    const payload = await apiFetch(`/standings?league=${leagueId}&season=${season}`);
    const table = payload?.response?.[0]?.league;
    const standings = (table?.standings?.[0] ?? []).slice(0, 8).map((row) => ({
      position: row.rank,
      team: row.team?.name ?? '',
      teamLogo: row.team?.logo ?? null,
      played: row.all?.played ?? 0,
      points: row.points ?? 0,
      form: row.form ?? '',
      goalsFor: row.all?.goals?.for ?? 0,
      goalsAgainst: row.all?.goals?.against ?? 0
    }));

    return {
      standings,
      leagueName: table?.name ?? 'League',
      leagueLogo: table?.logo ?? null,
      isFallback: false
    };
  } catch (error) {
    console.warn('Unable to load standings', error);
    return { standings: [], leagueName: 'League', isFallback: true };
  }
};

export const getTopScorers = async (leagueId = 39, limit = 6) => {
  if (!getApiKey()) {
    return { scorers: [], isFallback: true };
  }

  try {
    const season = getCurrentSeason();
    const payload = await apiFetch(`/players/topscorers?league=${leagueId}&season=${season}`);
    const scorers = (payload?.response ?? []).slice(0, limit).map((entry) => ({
      id: entry.player?.id,
      name: entry.player?.name ?? 'Unknown',
      photo: entry.player?.photo ?? null,
      club: entry.statistics?.[0]?.team?.name ?? '',
      clubLogo: entry.statistics?.[0]?.team?.logo ?? null,
      goals: entry.statistics?.[0]?.goals?.total ?? 0,
      assists: entry.statistics?.[0]?.goals?.assists ?? 0,
      appearances: entry.statistics?.[0]?.games?.appearences ?? 0
    }));

    return { scorers, isFallback: false };
  } catch (error) {
    console.warn('Unable to load top scorers', error);
    return { scorers: [], isFallback: true };
  }
};

export const getHomeOverview = async () => {
  const [live, today, standings, scorers, leagues] = await Promise.all([
    getLiveMatches(12),
    getTodayFixtures(12),
    getStandings(39),
    getTopScorers(39, 6),
    getFeaturedLeagues()
  ]);

  const liveCount = live.matches.length;
  const todayCount = today.total ?? today.fixtures.length;
  const goalsToday = today.fixtures.reduce((sum, fixture) => {
    if (fixture.homeGoals == null || fixture.awayGoals == null) return sum;
    return sum + fixture.homeGoals + fixture.awayGoals;
  }, 0);

  const liveLeagues = new Set(live.matches.map((match) => match.league)).size;
  const inPlay = live.matches.filter((match) => ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(match.status)).length;

  const dashboardStats = [
    { label: 'Live matches', value: String(liveCount), detail: `${inPlay} currently in play` },
    { label: 'Fixtures today', value: String(todayCount), detail: 'Across all competitions' },
    { label: 'Goals today', value: String(goalsToday), detail: 'From completed & live games' },
    { label: 'Active leagues', value: String(liveLeagues || leagues.leagues.length), detail: 'With live coverage' }
  ];

  const trendingTeams = standings.standings.slice(0, 3).map((team, index) => ({
    name: team.team,
    form: team.form || '—',
    accent: ['#0ea5e9', '#22c55e', '#f59e0b'][index] ?? '#0ea5e9',
    logo: team.teamLogo
  }));

  const topPlayers = scorers.scorers.slice(0, 3).map((player) => ({
    name: player.name,
    club: player.club,
    stat: `${player.goals} goals · ${player.assists} assists`,
    photo: player.photo
  }));

  return {
    dashboardStats,
    live,
    today,
    standings,
    scorers,
    leagues,
    trendingTeams,
    topPlayers,
    isFallback: live.isFallback || today.isFallback || standings.isFallback
  };
};
