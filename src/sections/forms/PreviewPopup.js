import { Dialog } from '@mui/material';
import React from 'react';
import Template1 from './templates/Template1';

const PreviewPopup = ({ form, formId, orgId, showPopup, setShowPopup }) => {
  const updatedForm = {
    ...form,
    template: {
      ...form.template,
      formtype: form?.template?.formtype || 'General',
    },
  };

  return (
    <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
      <Template1
        form={updatedForm}
        formId={formId}
        orgId={orgId}
        isPreviewMode={true}
        onClose={() => setShowPopup(false)}
      />
    </Dialog>
  );
};

export default PreviewPopup;
