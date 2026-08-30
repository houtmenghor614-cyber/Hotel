import { useState } from 'react';

import { uploadUrl } from '../../utils/uploads.js';

/**
 * Image with automatic fallback to a local placeholder when the remote
 * (backend /uploads) image fails to load.
 */
const FALLBACKS = {
  hotel: '/assets/hotels/hotel-1.jpg',
  room: '/assets/rooms/standard.jpg',
  banner: '/assets/banners/hero-1.jpg',
};

export default function Img({
  src,
  alt = '',
  fallback = 'hotel',
  className = '',
  ...props
}) {
  const [failed, setFailed] = useState(false);
  const source = failed || !src ? FALLBACKS[fallback] || FALLBACKS.hotel : uploadUrl(src);

  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
