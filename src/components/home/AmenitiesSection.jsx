import Icon from '../common/Icon.jsx';
import amenityApi from '../../api/amenityApi.js';
import { useFetch } from '../../hooks/useFetch.js';

const ICON_MAP = {
  wifi: 'wifi',
  pool: 'pool',
  restaurant: 'restaurant',
  parking: 'parking',
  'Free Wi-Fi': 'wifi',
  'Swimming Pool': 'pool',
  'Restaurant': 'restaurant',
  'Free Parking': 'parking',
  'Room Service': 'bed',
  '24/7 Front Desk': 'clock',
  'Airport Shuttle': 'plane',
  'Gym': 'gym',
  'Spa': 'spa',
  'Laundry Service': 'refresh',
  'Conference Room': 'users',
  'Bar': 'coffee',
};

export default function AmenitiesSection() {
  const { data, loading } = useFetch(() => amenityApi.getAmenities().then((r) => r.data));

  return (
    <section className="bg-slate-100/70">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Hotel Amenities</h2>
          <p className="mt-1 text-sm text-slate-500">
            Everything you can expect during your stay
          </p>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-sm text-slate-400">Loading amenities...</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {(data || []).slice(0, 8).map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={ICON_MAP[amenity.name] || 'check'} className="w-5 h-5" />
                </span>
                <span className="text-sm font-medium text-slate-700">{amenity.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
