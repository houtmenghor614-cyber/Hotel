import api from './axios.js';

export const reviewApi = {
  getHotelReviews: (hotelId, params = {}) =>
    api.get(`/reviews/hotel/${hotelId}`, {
      params: { page: 1, page_size: 10, ...params },
    }),
  createReview: (data) => api.post('/reviews', data),
};

export default reviewApi;
