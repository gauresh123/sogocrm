import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const testEmailCampign = async (email, name) => {
  try {
    const result = await axiosInstance.post(`/crm/user/testingCampaign`, { email: email, name: name });
    console.log(result?.data.success);
    return { success: result?.data.success };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

export const testEmailCampignBulk = async (email) => {
  try {
    const result = await axiosInstance.post(`/crm/user/testEmailCampignBulk`, { email: email });
    return { success: result?.data.success };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
