import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import Loading from '../../components/common/Loading.jsx';
import FavoriteCard from '../../components/account/FavoriteCard.jsx';
import favoriteApi from '../../api/favoriteApi.js';

export default function Favorites() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    favoriteApi
      .getFavorites()
      .then(({ data: res }) => setData(res))
      .catch((err) => setError(err?.response?.data?.detail || 'Could not load favorites'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">My Favorites</h1>
      <p className="text-sm text-slate-500">Hotels you have saved for later</p>

      <div className="mt-6">
        {loading && <Loading text="Loading favorites..." />}
        {error && <ErrorMessage message={error} retry={load} />}
        {!loading && !error && (!data?.items?.length ? (
          <EmptyState
            icon="heart"
            title="No favorites yet"
            description="Tap the heart on any hotel to save it here."
            action={
              <Link to="/hotels">
                <Button>Explore hotels</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {data.items.map((favorite) => (
              <FavoriteCard key={favorite.id} favorite={favorite} onRemoved={load} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
