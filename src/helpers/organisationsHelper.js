import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const addOrganisation = async (userId, organisationName) => {
  return axiosInstance
    .post('/crm', { userId, organisationName })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};

export const getUserOrganisations = async (userId) => {
  return axiosInstance
    .get(`/crm/user/${userId}/organisations`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};
