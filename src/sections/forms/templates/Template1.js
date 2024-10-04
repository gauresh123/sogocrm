import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import DynamicForm from '../DynamicForm';
import { axiosInstance } from 'src/axiosInstance';
import { toast } from 'react-toastify';

function Template1({ form, formId, orgId, PRIMARY_COLOR, SECONDARY_COLOR, isPreview = false, isPreviewMode, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCustomersubmitting, setIsCustomersubmitting] = useState(false);
  const { template } = form;

  const submitHandler = async (formData) => {
    if (isPreview) return;
    try {
      setIsSubmitting(true);
      const { data } = await axiosInstance.post(`/crm/${orgId}/form/${formId}/submit`, {
        mobileNo: '',
        fields: formData,
      });
      toast.success('Saved! Thank you for your response!');
    } catch (error) {
      toast.error(error.response?.body?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {template && (
        <Box
          sx={{
            border: '1px solid black',
            width: '100%',
            backgroundColor: SECONDARY_COLOR ? SECONDARY_COLOR : template.secondarycolor,
            minHeight: isPreviewMode ? 'auto' : '100vh',
          }}
        >
          {isPreviewMode && (
            <Stack
              direction={'row'}
              padding={1}
              sx={{ backgroundColor: 'white', border: 1 }}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h5">Preview</Typography>
              <Button variant="contained" size="small" onClick={onClose}>
                cancel
              </Button>
            </Stack>
          )}
          <Box
            sx={{
              width: { sm: '80%', lg: '80%', xs: '90%' },
              height: 'auto',
              margin: 'auto',
              paddingTop: 5,
            }}
          >
            <>
              {template.imageUrl && (
                <img
                  src={template.imageUrl}
                  alt="brand/img"
                  style={{ minWidth: '100%', marginBottom: 12, minHeight: 90 }}
                />
              )}

              <Box
                sx={{
                  padding: 3,
                  borderRadius: 1,
                  backgroundColor: '#ffffff',
                  borderColor: 'black',
                  marginBottom: 3,
                  borderTop: 7,
                  borderTopColor: PRIMARY_COLOR ? PRIMARY_COLOR : template.primaryColor,
                }}
              >
                <Typography variant="h4" mb={2}>
                  {template.title || (isPreview && 'Form Title')}
                </Typography>
                <Typography variant="body2">
                  {(template.formtext && template.formtext) || (isPreview && 'Description')}
                </Typography>
              </Box>
              <DynamicForm
                form={form}
                PRIMARY_COLOR={PRIMARY_COLOR ? PRIMARY_COLOR : template.primaryColor}
                SECONDARY_COLOR={SECONDARY_COLOR ? SECONDARY_COLOR : template.secondarycolor}
                submitHandler={submitHandler}
                isSubmitting={isSubmitting}
                isPreview={isPreview}
                isPreviewMode={isPreviewMode}
                formId={formId}
                isCustomersubmitting={isCustomersubmitting}
                setIsCustomersubmitting={(val) => setIsCustomersubmitting(val)}
                orgId={orgId}
              />
            </>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Template1;
