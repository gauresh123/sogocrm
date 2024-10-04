import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const addWhatsAppCampaignDetails = async (orgid, access_token, api_end_point, api_url) => {
  try {
    const result = await axiosInstance.post(`/crm/${orgid}/dashboard/addWhatsappCampaignDetails`, {
      access_token: access_token,
      api_end_point: api_end_point,
      api_url: api_url,
    });
    return { success: result?.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

export const getWhatsAppCampaignDetails = async (orgid) => {
  try {
    const result = await axiosInstance.get(`/crm/${orgid}/dashboard/getWhatsappCampaignDetails`);
    return { data: result?.data.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

export const editWhatsAppCampaignDetails = async (orgid, access_token, api_end_point, api_url) => {
  try {
    const result = await axiosInstance.put(`/crm/${orgid}/dashboard/updateWhatsappCampaignDetails`, {
      access_token: access_token,
      api_end_point: api_end_point,
      api_url: api_url,
    });
    return { success: result?.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
