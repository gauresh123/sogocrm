import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const checkout = async (amount) => {
  return axiosInstance
    .post(`/crm/payment/checkout`, { amount })
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      toast.error('error in payment process');
      // return { error: err.response?.data?.message || err.message, data: {} };
    });
};
