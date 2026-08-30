import api from './axios.js';

export const bookingApi = {
  checkAvailability: (data) => api.post('/bookings/check-availability', data),
  createBooking: (data) => api.post('/bookings', data),
  getMyBookings: (params = {}) =>
    api.get('/bookings', {
      params: { page: 1, page_size: 10, ...params },
    }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};

export default bookingApi;
