import { useQuery } from '@tanstack/react-query';
import {
  getMatchById,
  getMatchEvents,
  getMatchStatistics
} from '../services/footballService';

export const useMatchDetail = (matchId) => {
  const matchQuery = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => getMatchById(matchId),
    enabled: Boolean(matchId)
  });

  const eventsQuery = useQuery({
    queryKey: ['match-events', matchId],
    queryFn: () => getMatchEvents(matchId),
    enabled: Boolean(matchId),
    refetchInterval: 30_000
  });

  const statsQuery = useQuery({
    queryKey: ['match-statistics', matchId],
    queryFn: () => getMatchStatistics(matchId),
    enabled: Boolean(matchId),
    refetchInterval: 30_000
  });

  return {
    match: matchQuery.data?.match ?? null,
    events: eventsQuery.data?.events ?? [],
    statistics: statsQuery.data?.statistics ?? [],
    loading: matchQuery.isLoading,
    isFallback: matchQuery.data?.isFallback ?? false,
    error: matchQuery.error
  };
};
