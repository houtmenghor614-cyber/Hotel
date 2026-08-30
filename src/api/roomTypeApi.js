import api from './axios.js';

export const roomTypeApi = {
  getRoomTypes: (params = {}) =>
    api.get('/room-types', {
      params: { page: 1, page_size: 100, ...params },
    }),
  getRoomType: (id) => api.get(`/room-types/${id}`),
};

export default roomTypeApi;
