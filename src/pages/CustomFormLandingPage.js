import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingContainer from 'src/components/loader/LoadingContainer';
import useForm from 'src/hooks/useForm';
import Template1 from 'src/sections/forms/templates/Template1';

function CustomFormLandingPage() {
  const { formId, orgId } = useParams();
  const { form, loading: formLoading } = useForm(orgId, formId);

  return (
    <Box sx={{ height: '100%', mb: 0, border: '1px solid red' }}>
      <LoadingContainer loading={formLoading}>
        <Template1 form={form} formId={formId} orgId={orgId} isPreview={false} />
      </LoadingContainer>
    </Box>
  );
}

export default CustomFormLandingPage;
