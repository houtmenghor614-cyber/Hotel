import api from './axios.js';

export const roomApi = {
  getRooms: (params = {}) =>
    api.get('/rooms', {
      params: { page: 1, page_size: 100, ...params },
    }),
  getRoom: (id) => api.get(`/rooms/${id}`),
};

export default roomApi;
