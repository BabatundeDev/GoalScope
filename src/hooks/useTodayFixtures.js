import { useQuery } from '@tanstack/react-query';
import { getTodayFixtures } from '../services/footballService';

export const useTodayFixtures = (limit = 10) => {
  const query = useQuery({
    queryKey: ['today-fixtures', limit],
    queryFn: () => getTodayFixtures(limit),
    refetchInterval: 120_000
  });

  return {
    fixtures: query.data?.fixtures ?? [],
    total: query.data?.total ?? 0,
    loading: query.isLoading,
    isFallback: query.data?.isFallback ?? false
  };
};
