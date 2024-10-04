import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const addForm = async (organisationId, formTitle, fields, template) => {
  return axiosInstance
    .post(`/crm/${organisationId}/form`, { formTitle, fields, template })
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};

export const getForms = async (organisationId, categories) => {
  return axiosInstance
    .post(`/crm/${organisationId}/forms`, { categories: categories })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getForm = async (organisationId, formId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/form/${formId}`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getSubmissions = async (organisationId, formId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/form/${formId}/submissions`)
    .then((res) => {
      return { message: res.data.message, data: res.data.submissions };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getSubmission = async (organisationId, submissionId) => {
  return axiosInstance
    .get(`crm/${organisationId}/form/submission/${submissionId}`)
    .then((res) => {
      return { message: res.data.message, data: res.data.submission };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getSubmissionData = async (organisationId, formId) => {
  return axiosInstance
    .post(`/crm/${organisationId}/submissionData`, { formId: formId })
    .then((res) => {
      return { message: res.data.message, data: res.data.submissions };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const editForm = async (
  organisationId,
  formId,
  newfields,
  template,
  f_title,
  fieldids,
  fieldnames,
  f_types,
  f_required
) => {
  return axiosInstance
    .post(`/crm/${organisationId}/updateform/${formId}`, {
      newfields,
      template,
      f_title,
      fieldids,
      fieldnames,
      f_types,
      f_required,
    })
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};
