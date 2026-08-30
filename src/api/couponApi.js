import api from './axios.js';

export const couponApi = {
  validate: (code, subtotal) =>
    api.post('/coupons/validate', { code, subtotal }),
};

export default couponApi;
