import api from './axios.js';

export const hotelApi = {
  getHotels: (params = {}) =>
    api.get('/hotels', {
      params: {
        page: 1,
        page_size: 12,
        ...params,
      },
    }),
  getHotel: (id) => api.get(`/hotels/${id}`),
  getHotelBySlug: (slug) => api.get(`/hotels/slug/${slug}`),
};

export default hotelApi;
