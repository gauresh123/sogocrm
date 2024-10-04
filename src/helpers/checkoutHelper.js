import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const checkOutFunction = async (organisationId, subscriptionId, name, amount) => {
  return axiosInstance
    .post(`/crm/payment/stripe/checkout/${organisationId}/${subscriptionId}`, { name: name, amount: amount })
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};

export const updateSubscription = async (organisationId, subscriptionId) => {
  return axiosInstance
    .put(`/crm/payment/updatesubscription/${organisationId}/${subscriptionId}`)
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};
