import { toast } from 'react-toastify';
import { axiosInstance } from '../axiosInstance';

export const getScanMetrics = async (organisationId, codeId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/qrcode/${codeId}/metrics`)
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const getDashboardCount = async (organisationId) => {
  return axiosInstance
    .get(`/crm/${organisationId}/dashboard`)
    .then((res) => {
      return { message: res.data.message, data: res.data };
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || err.message);
      return { error: err.response?.data?.message, data: {} };
    });
};

export const SendEmailCampignBulk = async (emails, subject, htmlString) => {
  try {
    const result = await axiosInstance.post(`/crm/dashboard/sendMail`, {
      to: emails,
      subject: subject,
      email_content: htmlString,
    });
    return { success: result?.data.success };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

export const SendWhatsappCampignBulk = async (receivers, broadcast_name, template_name, access_token, end_point) => {
  try {
    const result = await axiosInstance.post(`/crm/dashboard/sendWhatsapp`, {
      receivers,
      broadcast_name,
      template_name,
      access_token,
      end_point,
    });
    return { success: result?.data.success };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

export const addCampaigns = async (
  receivers,
  broadcast_name,
  template_name,
  template_id,
  no_of_customers,
  type,
  campaign_name,
  run_date,
  orgid,
  customers_id,
  access_token,
  end_point
) => {
  try {
    const result = await axiosInstance.post(`/crm/${orgid}/addCampaigns`, {
      receivers,
      broadcast_name,
      template_name,
      template_id,
      no_of_customers,
      type,
      campaign_name,
      run_date,
      customers_id: customers_id,
      access_token,
      end_point,
    });
    return { success: result?.data.success };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
