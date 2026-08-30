import { useState } from 'react';

import Icon from '../common/Icon.jsx';
import Img from '../common/Img.jsx';
import Modal from '../common/Modal.jsx';

export default function HotelGallery({ hotel }) {
  const images = [hotel.image, ...(hotel.images || [])].filter(Boolean);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) {
    return (
      <Img
        src={null}
        alt={hotel.name}
        fallback="hotel"
        className="h-72 w-full rounded-xl object-cover"
      />
    );
  }

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded-xl cursor-zoom-in" onClick={() => setLightbox(true)}>
        <Img
          src={images[active]}
          alt={`${hotel.name} photo ${active + 1}`}
          fallback="hotel"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-slate-900/60 px-2.5 py-1 text-xs text-white backdrop-blur">
          <Icon name="search" className="w-3.5 h-3.5" />
          View gallery
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              className={`h-16 w-full overflow-hidden rounded-lg border-2 transition ${
                index === active ? 'border-brand-600' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fallback="hotel"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Modal open={lightbox} onClose={() => setLightbox(false)} title={hotel.name} size="lg">
        <Img
          src={images[active]}
          alt={hotel.name}
          fallback="hotel"
          className="mx-auto max-h-[60vh] rounded-lg object-contain"
        />
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setActive((index) => (index - 1 + images.length) % images.length)}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Previous image"
          >
            <Icon name="chevron-left" className="w-5 h-5" />
          </button>
          <span className="self-center text-sm text-slate-500">
            {active + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => setActive((index) => (index + 1) % images.length)}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Next image"
          >
            <Icon name="chevron-right" className="w-5 h-5" />
          </button>
        </div>
      </Modal>
    </div>
  );
}
