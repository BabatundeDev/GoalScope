import { useEffect, useState } from 'react';
import { getLiveMatches } from '../services/footballService';

export const useLiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMatches = async () => {
      setLoading(true);
      const result = await getLiveMatches();

      if (!active) {
        return;
      }

      setMatches(result.matches);
      setIsFallback(result.isFallback);
      setLoading(false);
    };

    loadMatches();

    return () => {
      active = false;
    };
  }, []);

  return { matches, loading, isFallback };
};
