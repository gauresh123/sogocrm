import React, { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../axiosInstance';

export const Pricings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pricingData, setPricingData] = useState([]);

  const getSubscriptionplan = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axiosInstance.get(`/crm/subscription`).then((res) => {
        if (res.data) {
          const updatedData = res.data.subscriptionPlans
            ?.filter((val) => val?.subscription_plan_name !== 'Basic')
            ?.map((val) => {
              const updatedItem = {
                id: val.subscription_plan_id,
                plan: val.subscription_plan_name,
                price: val.price,
              };
              return updatedItem;
            });

          setPricingData(updatedData);
        }
      });
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSubscriptionplan();
  }, [getSubscriptionplan]);

  return { loading, error, pricingData };
};
