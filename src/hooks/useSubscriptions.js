import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../axiosInstance';

export const useSubscriptions = (organisationId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState({});
  const [refresh, setRefresh] = useState(false);

  const getSubscription = useCallback(async () => {
    if (!organisationId || loading) return;
    try {
      setLoading(true);
      await axiosInstance.get(`/crm/${organisationId}/subscription`).then((res) => {
        if (res.data) {
          setSubscription(res.data.subscription);
        }
      });
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [organisationId, refresh]);

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  const getEnabled = (code) => {
    return subscription?.features?.find((val) => val.feature_code === code)?.enabled || false;
  };

  return { loading, error, subscription, getEnabled, getSubscription, setRefresh, refresh };
};
