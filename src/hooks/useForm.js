import { useEffect, useState } from 'react';
import { axiosInstance } from 'src/axiosInstance';

const useForm = (orgId, formId) => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getForm() {
      try {
        if (loading || !orgId || !formId) return;
        setLoading(true);
        const result = await axiosInstance.get(`/crm/${orgId}/form/${formId}`);
        setForm(result.data.data[0]);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    getForm();
  }, [orgId, formId]);

  return { form, loading, error };
};

export default useForm;
