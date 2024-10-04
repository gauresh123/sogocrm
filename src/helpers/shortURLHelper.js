import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const addShortURL = async (organisationId, originalLink, shortLink) => {
  return axiosInstance
    .post(`/crm/${organisationId}/addshorturl/custom`, { originalLink: originalLink, shortLink: shortLink })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getURLs = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/geturls`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      // toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const editShortURL = async (organisationId, shortlink, originallink) => {
  return axiosInstance
    .put(`/crm/${organisationId}/updateshorturl/custom`, {
      shortlink: shortlink,
      originallink: originallink,
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};
