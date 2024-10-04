import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../axiosInstance';

export const useOrganisation = (organisationId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [organisation, setOrganisation] = useState(null);

  const getOrganisation = useCallback(async () => {
    if (!organisationId || loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/crm/${organisationId}`);
      setOrganisation(data.data);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [organisationId]);

  useEffect(() => {
    getOrganisation();
  }, [getOrganisation]);

  return { loading, error, organisation };
};
