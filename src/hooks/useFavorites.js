import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'goalscope-favorites';

const initialFavorites = {
  players: [],
  teams: [],
  leagues: []
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFavorites({ ...initialFavorites, ...parsed });
      }
    } catch {
      // fall back to defaults
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (type, item) => {
    const normalizedType = type ?? 'teams';
    const exists = favorites[normalizedType].some((entry) => entry.id === item.id || entry.name === item.name);

    setFavorites((current) => {
      const nextItems = exists
        ? current[normalizedType].filter((entry) => entry.id !== item.id && entry.name !== item.name)
        : [...current[normalizedType], item];

      return {
        ...current,
        [normalizedType]: nextItems
      };
    });

    toast.success(exists ? 'Removed from favorites' : 'Added to favorites');
  };

  const isFavorite = (type, item) => favorites[type].some((entry) => entry.id === item.id || entry.name === item.name);

  const favoriteCount = useMemo(() => Object.values(favorites).reduce((total, items) => total + items.length, 0), [favorites]);

  return { favorites, toggleFavorite, isFavorite, favoriteCount };
};
