import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../axiosInstance';

export const useWatiSettings = (organisationId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [watiData,setWatiData] = useState(null);

  const getWatiSettings = useCallback(async () => {
    if (!organisationId || loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/crm/${organisationId}/dashboard/getWhatsappCampaignDetails`);
      setWatiData(data?.data[0]);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [organisationId]);

  useEffect(() => {
    getWatiSettings();
  }, [getWatiSettings]);

  return { loading, error, watiData };
};
