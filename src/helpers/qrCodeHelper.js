import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const getQRCodes = async (organisationId, categories) => {
  return axiosInstance
    .post(`/crm/${organisationId}/qrcode`, { categories: categories })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getQRCode = async (organisationId, qrcodeId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/qrcode/${qrcodeId}`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const createQRCode = async (organisationId, name, type, content, isDynamic, color, bgColor, logo, data) => {
  return axiosInstance
    .post(`/crm/${organisationId}/qrcode/create`, {
      name,
      type,
      content,
      data: data,
      isDynamic,
      color,
      bgColor,
      logo,
      bgImage: null,
      variant: 'standard',
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};

export const createTimeBound = async (
  organisationId,
  name,
  content,
  color,
  bgColor,
  logo,
  data,
  startdate,
  enddate,
  newcontent
) => {
  return axiosInstance
    .post(`/crm/${organisationId}/qrcode/createTimeBound`, {
      name,
      type: 'timebound',
      content,
      data: data,
      isDynamic: true,
      color,
      bgColor,
      logo,
      bgImage: null,
      variant: 'standard',
      startdate,
      enddate,
      newcontent: newcontent || '',
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};

export const editQrCode = async (
  organisationId,
  qrcodeId,
  name,
  type,
  content,
  isActive,
  color,
  bgColor,
  logo,
  data
) => {
  return axiosInstance
    .put(`/crm/${organisationId}/qrcode/${qrcodeId}`, {
      name,
      type,
      targetUrl: content,
      isActive,
      data: data || {},
      color,
      bgColor,
      logo,
      bgImage: null,
      variant: 'standard',
    })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message || err.message, data: {} };
    });
};

export const getQRCodes_v2 = async (organisationId, categories) => {
  return axiosInstance
    .post(`/crm/${organisationId}/qrcode/get`, { types: ['applink'], categories: categories })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getTimeBoundQRCodes = async (organisationId) => {
  return axiosInstance
    .post(`/crm/${organisationId}/qrcode/get`, { types: ['timebound'], categories: ['0'] })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getQRCodeScanLink = (organisationId, qrcodeId) => {
  if (!organisationId || !qrcodeId) throw Error('Invalid organisationId or qrcodeId');
  return `${process.env.REACT_APP_SOGO_API}/crm/${organisationId}/qrcode/${qrcodeId}/scan`;
};

export const getCategories = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/category`)
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const addCategorytoqrCode = async (organisationId, codeId, categoryId) => {
  return axiosInstance
    .post(`/crm/${organisationId}/category/${codeId}/add`, { categoryId: categoryId })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const addCategory = async (organisationId, categoryName) => {
  return axiosInstance
    .post(`/crm/${organisationId}/category/create`, { categoryName: categoryName })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const deleteCategory = async (organisationId, categoryId) => {
  return axiosInstance
    .post(`/crm/${organisationId}/category/delete`, { categoryId: categoryId })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};
