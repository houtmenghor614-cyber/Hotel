import api from './axios.js';

export const userApi = {
  updateProfile: (data) => api.put('/users/me', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  changePassword: (data) => api.put('/users/me/password', data),
};

export default userApi;
