import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import Stars from '../common/Stars.jsx';
import favoriteApi from '../../api/favoriteApi.js';

export default function FavoriteCard({ favorite, onRemoved }) {
  const { hotel } = favorite;
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await favoriteApi.removeFavorite(hotel.id);
      onRemoved?.();
    } catch {
      // eslint-disable-next-line no-alert
      window.alert('Could not remove favorite');
    } finally {
      setRemoving(false);
    }
  };

  if (!hotel) return null;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <Link to={`/hotels/${hotel.id}`} className="block h-32 w-full shrink-0 overflow-hidden rounded-lg sm:w-44">
        <Img src={hotel.image} alt={hotel.name} fallback="hotel" className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/hotels/${hotel.id}`} className="font-semibold text-slate-800 hover:text-brand-700">
              {hotel.name}
            </Link>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <Icon name="map-pin" className="w-3.5 h-3.5" /> {hotel.city}
            </p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Icon name="heart" className="w-4 h-4" fill="currentColor" strokeWidth={0} />
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Stars rating={hotel.avg_rating} className="w-3.5 h-3.5" />
          <span className="text-xs text-slate-500">
            {hotel.avg_rating ? hotel.avg_rating.toFixed(1) : 'New'}
          </span>
        </div>

        <div className="mt-auto flex justify-end gap-2 pt-4">
          <Link to={`/hotels/${hotel.id}`}>
            <Button variant="outline" size="sm" icon="eye">
              View hotel
            </Button>
          </Link>
          <Button variant="danger" size="sm" loading={removing} onClick={handleRemove} icon="heart">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
