import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const getCustomers = async (organisationId, pageNo) => {
  return axiosInstance
    .get(`/crm/${organisationId}/customers?searchText=""&pageNo=${pageNo}&pageSize=200`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const importCustomers = async (organisationId, customerList) => {
  return axiosInstance
    .post(`/crm/${organisationId}/customer/import`, { customers: customerList })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};

export const getCustomerById = async (organisationId, customerId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/customers/${customerId}`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};

export const editCustomer = async (organisationId, customerId, first_name, mobile, event_date, event_type) => {
  return axiosInstance
    .post(`/crm/${organisationId}/editCustomers/${customerId}`, {
      first_name: first_name,
      mobile: mobile,
      event_date: event_date,
      event_type: event_type,
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};

export const deleteCustomer = async (organisationId, customerId) => {
  return axiosInstance
    .post(`/crm/${organisationId}/deleteCustomers/${customerId}`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.message, data: {} };
    });
};
