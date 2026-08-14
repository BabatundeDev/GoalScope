import { useQuery } from '@tanstack/react-query';
import {
  getFeaturedLeagues,
  getStandings,
  getTopScorers
} from '../services/footballService';

export const useLeaguesData = () => {
  const query = useQuery({
    queryKey: ['featured-leagues'],
    queryFn: getFeaturedLeagues,
    staleTime: 300_000
  });

  return {
    leagues: query.data?.leagues ?? [],
    loading: query.isLoading,
    isFallback: query.data?.isFallback ?? false
  };
};

export const useStandingsData = (leagueId = 39) => {
  const query = useQuery({
    queryKey: ['standings', leagueId],
    queryFn: () => getStandings(leagueId),
    staleTime: 120_000
  });

  return {
    standings: query.data?.standings ?? [],
    leagueName: query.data?.leagueName ?? 'League',
    leagueLogo: query.data?.leagueLogo ?? null,
    loading: query.isLoading,
    isFallback: query.data?.isFallback ?? false
  };
};

export const useTopScorersData = (leagueId = 39, limit = 8) => {
  const query = useQuery({
    queryKey: ['top-scorers', leagueId, limit],
    queryFn: () => getTopScorers(leagueId, limit),
    staleTime: 300_000
  });

  return {
    scorers: query.data?.scorers ?? [],
    loading: query.isLoading,
    isFallback: query.data?.isFallback ?? false
  };
};
