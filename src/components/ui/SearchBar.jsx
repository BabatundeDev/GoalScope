import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from './Icon';
import { playerDirectory, teamDirectory, leagueDirectory } from '../../constants/routeData';

const searchSources = [
  ...playerDirectory.map((item) => ({ ...item, type: 'player', route: '/players' })),
  ...teamDirectory.map((item) => ({ ...item, type: 'team', route: '/teams' })),
  ...leagueDirectory.map((item) => ({ ...item, type: 'league', route: '/leagues' }))
];

/**
 * Compact search with a fixed 16px icon — avoids the oversized glyph that threw off nav balance.
 */
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const shellRef = useRef(null);
  const listId = useId();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchValue = query.toLowerCase();
    return searchSources
      .filter((item) =>
        [item.name, item.role, item.country, item.club, item.focus]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchValue))
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!shellRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <div className="search-shell" ref={shellRef}>
      <label className="search-input">
        <SearchIcon size={16} className="search-icon" />
        <input
          aria-label="Search players, teams, and leagues"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open && results.length > 0}
          placeholder="Search players, teams, leagues"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
      </label>
      {open && results.length ? (
        <div id={listId} className="search-results" role="listbox">
          {results.map((item) => (
            <Link
              key={`${item.type}-${item.name}`}
              to={item.route}
              className="search-result"
              role="option"
              onClick={() => {
                setQuery('');
                setOpen(false);
              }}
            >
              <span className="search-result__type">{item.type}</span>
              <span className="search-result__name">{item.name}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
