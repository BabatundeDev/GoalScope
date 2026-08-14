import { useQuery } from '@tanstack/react-query';
import { getHomeOverview } from '../services/footballService';

export const useHomeOverview = () => {
  const query = useQuery({
    queryKey: ['home-overview'],
    queryFn: getHomeOverview,
    refetchInterval: 60_000
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFallback: query.data?.isFallback ?? false,
    error: query.error
  };
};
