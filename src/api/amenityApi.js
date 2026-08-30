import api from './axios.js';

export const amenityApi = {
  getAmenities: () => api.get('/amenities'),
};

export default amenityApi;
