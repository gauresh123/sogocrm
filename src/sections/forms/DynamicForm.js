import { CheckBox } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../../axiosInstance';
import { toast } from 'react-toastify';
import { removeSpacesFromKeys } from 'src/utils/removeSpacesFromKeys';

function DynamicForm({
  form,
  submitHandler,
  isSubmitting = false,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  isPreview,
  isPreviewMode,
  formId,
  isCustomersubmitting,
  setIsCustomersubmitting,
  orgId,
}) {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const formRef = useRef();
  const { fields } = form;
  const { template } = form;

  const formtype = template.formtype || 'General';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const formData = new FormData(e.target);

    const formDataObject = {};
    formData.forEach((value, name) => {
      formDataObject[name] = value;
    });
    submitHandler(formDataObject);
  };

  const handleClear = () => {
    setOpen(false);
    const form = formRef.current;
    for (const element of form.elements) {
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
        element.value = '';
      }
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(`/crm/${orgId}/getEvents`);

      setEvents(res?.data.data);
    })();
  }, [orgId]);

  const newHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObject = {};
    formData.forEach((value, name) => {
      formDataObject[name] = value;
    });

    const updatedData = removeSpacesFromKeys(formDataObject);

    if (isCustomersubmitting) return;
    try {
      setIsCustomersubmitting(true);
      const { data } = await axiosInstance.post(`/crm/${orgId}/addCustomer`, {
        firstName: updatedData?.Name,
        lastName: '',
        mobileNo: updatedData?.MobileNumber,
        event_date: updatedData?.eventdate,
        event_type: updatedData?.Event,
      });
      toast.success('Saved! Thank you for your response!');
    } catch (error) {
      toast.error(error.response?.body?.message || error.message);
    } finally {
      setIsCustomersubmitting(false);
    }
  };

  return (
    <>
      {formtype == 'General' && (
        <form ref={formRef} onSubmit={handleSubmit}>
          {fields?.map((field, i) => (
            <FormControl
              key={i}
              fullWidth
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: 'silver',
                marginBottom: 3,
              }}
            >
              <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>{field.fieldname}</FormLabel>

              <TextField
                disabled={isPreviewMode ? true : false}
                multiline={field.type === 'textarea'}
                type={field.type}
                variant="standard"
                placeholder="Your answer"
                name={field.fieldid || i}
                required={field.required}
                sx={{
                  '& .MuiInput-root:focused::before': {
                    borderColor: PRIMARY_COLOR,
                  },
                }}
              />
            </FormControl>
          ))}

          <Box display={isPreviewMode ? 'none' : 'flex'} justifyContent={'space-between'}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 2,
                width: '30%',
                marginBottom: 2,
                backgroundColor: PRIMARY_COLOR,
                ':hover': {
                  bgcolor: PRIMARY_COLOR,
                  color: 'white',
                },
              }}
            >
              {isSubmitting ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Submit '}
            </Button>

            <Typography
              color={PRIMARY_COLOR}
              mt={3}
              mb={2}
              variant="button"
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            >
              Clear form
            </Typography>
          </Box>
        </form>
      )}

      {formtype == 'Event' && (
        <form ref={formRef} onSubmit={newHandleSubmit}>
          {/* 
            <FormControl
              fullWidth
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: 'silver',
                marginBottom: 3,
              }}
            >
              <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Event</FormLabel>

              <TextField
                disabled={isPreviewMode ? true : false}
                select
                variant="standard"
                placeholder="Your answer"
                name={'Event'}
                type="text"
                required
                sx={{
                  '& .MuiInput-root:focused::before': {
                    borderColor: PRIMARY_COLOR,
                  },
                }}
              >
                <MenuItem>Anniversary</MenuItem>
                <MenuItem>Birthday</MenuItem>
                <MenuItem>General</MenuItem>
              </TextField>
            </FormControl> */}
          <FormControl
            fullWidth
            sx={{
              padding: 3,
              borderRadius: 1,
              backgroundColor: '#ffffff',
              border: 1,
              borderColor: 'silver',
              marginBottom: 3,
            }}
          >
            <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Name</FormLabel>

            <TextField
              disabled={isPreviewMode ? true : false}
              type="text"
              variant="standard"
              placeholder="Your answer"
              name={'Name'}
              required
              sx={{
                '& .MuiInput-root:focused::before': {
                  borderColor: PRIMARY_COLOR,
                },
              }}
            />
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              padding: 3,
              borderRadius: 1,
              backgroundColor: '#ffffff',
              border: 1,
              borderColor: 'silver',
              marginBottom: 3,
            }}
          >
            <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Mobile Number</FormLabel>

            <TextField
              disabled={isPreviewMode ? true : false}
              type="text"
              variant="standard"
              placeholder="Your answer"
              name={'MobileNumber'}
              required
              sx={{
                '& .MuiInput-root:focused::before': {
                  borderColor: PRIMARY_COLOR,
                },
              }}
            />
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              padding: 3,
              borderRadius: 1,
              backgroundColor: '#ffffff',
              border: 1,
              borderColor: 'silver',
              marginBottom: 3,
            }}
          >
            <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Event</FormLabel>
            <Select
              disabled={isPreviewMode ? true : false}
              variant="standard"
              name="Event"
              required
              sx={{
                '& .MuiInput-root:focused::before': {
                  borderColor: PRIMARY_COLOR,
                },
              }}
            >
              {events?.map((val) => (
                <MenuItem value={val?.event_type}>{val?.event_type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              padding: 3,
              borderRadius: 1,
              backgroundColor: '#ffffff',
              border: 1,
              borderColor: 'silver',
              marginBottom: 3,
            }}
          >
            <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Event Date</FormLabel>

            <TextField
              disabled={isPreviewMode ? true : false}
              type={'date'}
              variant="standard"
              placeholder="Your answer"
              name={'eventdate'}
              required
              sx={{
                '& .MuiInput-root:focused::before': {
                  borderColor: PRIMARY_COLOR,
                },
              }}
            />
          </FormControl>

          <Box display={isPreviewMode ? 'none' : 'flex'} justifyContent={'space-between'}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 2,
                width: '30%',
                marginBottom: 2,
                backgroundColor: PRIMARY_COLOR,
                ':hover': {
                  bgcolor: PRIMARY_COLOR,
                  color: 'white',
                },
              }}
            >
              {isCustomersubmitting ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Submit'}
            </Button>

            <Typography
              color={PRIMARY_COLOR}
              mt={3}
              mb={2}
              variant="button"
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            >
              Clear form
            </Typography>
          </Box>
        </form>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Clear form?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will remove your answers from all questions, and cannot be undone</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: 'white',
              backgroundColor: PRIMARY_COLOR,
              ':hover': {
                bgcolor: SECONDARY_COLOR,
                color: 'white',
              },
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: 'white',
              backgroundColor: PRIMARY_COLOR,
              ':hover': {
                bgcolor: SECONDARY_COLOR,
                color: 'white',
              },
            }}
            onClick={handleClear}
          >
            Clear form
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DynamicForm;
