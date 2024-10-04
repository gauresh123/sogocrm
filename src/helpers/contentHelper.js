import { toast } from "react-toastify";
import { axiosInstance } from "../axiosInstance";


export const addContent = async (organisationId, contentName,description) => {
    return axiosInstance
      .post(`/crm/${organisationId}/addContent`, {
        contentName,
        description
      })
      .then((res) => {
        return { message: res.data.message, data: res.data.data };
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        return { error: err.response?.data?.message, data: {} };
      });
  };


  

export const getContent = async (organisationId) => {
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
  


  
export const editContent = async (organisationId, contentName,description,contentId) => {
    return axiosInstance
      .post(`/crm/${organisationId}/editContent`, {
        contentId,
        contentName,
        description
      })
      .then((res) => {
        return { message: res.data.message, data: res.data.data };
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        return { error: err.response?.data?.message, data: {} };
      });
  };



  export const getTemplate = async (organisationId) => {
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

  export const addTemplate = async (organisationId, templateName,description) => {
    return axiosInstance
      .post(`/crm/${organisationId}/addTemplate`, {
        templateName,
        description
      })
      .then((res) => {
        return { message: res.data.message, data: res.data.data };
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        return { error: err.response?.data?.message, data: {} };
      });
  };



  export const editTemplate = async (organisationId,templateName,description,templateId) => {
    return axiosInstance
      .post(`/crm/${organisationId}/editTemplate`, {
        templateId,
        templateName,
        description
      })
      .then((res) => {
        return { message: res.data.message, data: res.data.data };
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        return { error: err.response?.data?.message, data: {} };
      });
  };


  export const deleteContent = async (organisationId,contentId) => {
    return axiosInstance
      .post(`/crm/${organisationId}/deleteContent`, {
        contentId
      })
      .then((res) => {
        return { message: res.data.message, data: res.data.data };
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        return { error: err.response?.data?.message, data: {} };
      });
  };

  export const deleteTemplate = async (organisationId,templateId) => {
    return axiosInstance
      .post(`/crm/${organisationId}/deleteTemplate`, {
        templateId
      })
      .then((res) => {
        return { message: res.data.message, data: res.data.data };
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        return { error: err.response?.data?.message, data: {} };
      });
  };



