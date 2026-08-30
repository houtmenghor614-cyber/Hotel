import api from './axios.js';

export const favoriteApi = {
  getFavorites: (params = {}) =>
    api.get('/favorites', {
      params: { page: 1, page_size: 20, ...params },
    }),
  addFavorite: (hotelId) => api.post('/favorites', { hotel_id: hotelId }),
  removeFavorite: (hotelId) => api.delete(`/favorites/${hotelId}`),
};

export default favoriteApi;
