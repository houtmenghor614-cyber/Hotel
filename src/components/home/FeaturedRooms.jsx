import { Link } from 'react-router-dom';

import Button from '../common/Button.jsx';
import EmptyState from '../common/EmptyState.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import Loading from '../common/Loading.jsx';
import RoomCard from './RoomCard.jsx';
import roomTypeApi from '../../api/roomTypeApi.js';
import { useFetch } from '../../hooks/useFetch.js';

export default function FeaturedRooms() {
  const { data, loading, error, refetch } = useFetch(() =>
    roomTypeApi.getRoomTypes({ page: 1, page_size: 4 }).then((r) => r.data)
  );

  return (
    <section className="bg-slate-100/70">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Featured Rooms</h2>
            <p className="mt-1 text-sm text-slate-500">
              Popular room types across our hotels
            </p>
          </div>
          <Link to="/rooms">
            <Button variant="outline" size="sm" icon="arrow-right">
              View all
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          {loading && <Loading text="Loading rooms..." />}
          {error && <ErrorMessage message={error} retry={refetch} />}
          {!loading && !error && (!data?.items?.length ? (
            <EmptyState icon="bed" title="No rooms available yet" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.items.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
