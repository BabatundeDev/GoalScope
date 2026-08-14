import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLiveMatches } from '../services/footballService';

export const useFootballData = () => {
  const liveMatchesQuery = useQuery({
    queryKey: ['live-matches'],
    queryFn: getLiveMatches,
    refetchInterval: 15_000
  });

  const matches = useMemo(() => liveMatchesQuery.data?.matches ?? [], [liveMatchesQuery.data]);
  const isFallback = liveMatchesQuery.data?.isFallback ?? false;

  return {
    matches,
    loading: liveMatchesQuery.isLoading,
    isFallback,
    error: liveMatchesQuery.error
  };
};
