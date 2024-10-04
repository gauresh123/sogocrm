import { toast } from 'react-toastify';
import { axiosInstance } from 'src/axiosInstance';

export const getCampaigns = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/getCampaigns`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getCustomersEvent = async (organisationId, days, event_type, range) => {
  return axiosInstance
    .post(`/crm/${organisationId}/getCustomersEvent`, {
      days: days,
      event_type: event_type,
      range: range,
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getEvents = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/getEvents`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getTemplates = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/getTemplate`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getContents = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/getContent`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getCustomersCampaigns = async (organisationId, campaign_id) => {
  return axiosInstance
    .post(`/crm/${organisationId}/getCustomersCampaigns`, {
      campaign_id: campaign_id,
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};
