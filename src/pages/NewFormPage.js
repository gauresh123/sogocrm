import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  FormLabel,
  Box,
  Grid,
  FormHelperText,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthContext from '../context/AuthContext';
import { addForm, getForms } from '../helpers/formHelper';
import Iconify from '../components/iconify/Iconify';
import Template1 from '../sections/forms/templates/Template1';
import { IMGBBuploadImage, getImageBase64 } from '../helpers/imageHelper';
import { LoadingButton } from '@mui/lab';

const NewFormPage = () => {
  const [showAddField, setShowAddField] = useState(false);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [fieldname, setFieldname] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#2664c9');
  const [secondarycolor, setSecondaryColor] = useState('#eeeeee');
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [errors, setErrors] = useState({});
  const [formType, setFormType] = useState('General');
  const navigate = useNavigate();

  const { currentOrgId } = useAuthContext();
  const obj = {
    fieldname,
    required: true,
    type,
  };

  const form = {
    fields: data,
    formtitle: title,
    template: {
      title,
      primaryColor,
      secondarycolor,
      imageUrl: imgBase64,
      formtext: description,
      formtype: formType,
    },
  };
  const handleAdd = () => {
    if (!fieldname) {
      setErrors((prev) => ({ ...prev, fieldname: 'fieldname is required' }));
      return;
    }
    if (!type) {
      setErrors((prev) => ({ ...prev, type: 'type is required' }));
      return;
    }
    setData((prev) => [...prev, obj]);
    setType('');
    setFieldname('');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (data.length == 0) {
      toast.warn('Please add some fields');
      return;
    }
    setLoading(true);
    let imageUrl = '';
    if (image) {
      const { imgurl, error: imageError } = await IMGBBuploadImage(await getImageBase64(image));
      if (imageError) {
        toast.error('Error', 'There was an error while uploading image');
        return;
      }
      imageUrl = imgurl;
    }

    const template = {
      title,
      primaryColor,
      secondarycolor,
      imageUrl,
      formtext: description,
      formtype: formType,
    };

    await addForm(currentOrgId, title, data, template)
      .then((res) => {
        if (!res.error) {
          toast.success('Form Created Successfully');
        }
      })
      .finally(() => {
        setLoading(false);
        navigate(-1);
      });
  };

  const submitFormEvent = async (e) => {
    e.preventDefault();
    if (!title) {
      setErrors((prev) => ({ ...prev, title: 'title is required' }));
      return;
    }
    if (!description) {
      setErrors((prev) => ({ ...prev, description: 'description is required' }));
      return;
    }
    if (loading) return;
    setLoading(true);
    let imageUrl = '';
    if (image) {
      const { imgurl, error: imageError } = await IMGBBuploadImage(await getImageBase64(image));
      if (imageError) {
        toast.error('Error', 'There was an error while uploading image');
        return;
      }
      imageUrl = imgurl;
    }

    const template = {
      title,
      primaryColor,
      secondarycolor,
      imageUrl,
      formtext: description,
      formtype: formType,
    };

    const eventData = [
      { fieldname: 'Event Date', required: true, type: 'Date' },
      { fieldname: 'Event', required: true, type: 'text' },
      { fieldname: 'Name', required: true, type: 'text' },
      { fieldname: 'Mobile Number', required: true, type: 'Number' },
    ];

    await addForm(currentOrgId, title, eventData, template)
      .then((res) => {
        if (!res.error) {
          toast.success('Form Created Successfully');
        }
      })
      .finally(() => {
        setLoading(false);
        navigate(-1);
      });
  };

  const nextHandlePress = () => {
    if (!title) {
      setErrors((prev) => ({ ...prev, title: 'title is required' }));
      return;
    }
    if (!description) {
      setErrors((prev) => ({ ...prev, description: 'description is required' }));
      return;
    }
    setShowAddField(!showAddField);
  };
  const onImageChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const data = new FileReader();
      data.addEventListener('load', () => {
        setImgBase64(data.result);
      });
      data.readAsDataURL(e.target.files[0]);
    }
  };
  const fieldCancelPressed = (index) => {
    setData((prev) => prev.filter((val, i) => index !== i));
  };
  return (
    <Box sx={{ marginTop: { sm: -3, xs: -1 } }}>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} width={'100%'} padding={2} height={'100vh'} sx={{ marginTop: { xs: 2 } }}>
          <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
            <Typography variant="h5">{!showAddField ? 'Create Form' : 'Add Fields'}</Typography>
            {formType == 'General' && (
              <Button variant="contained" onClick={nextHandlePress}>
                {!showAddField ? 'Next' : 'Back'}
              </Button>
            )}
            {formType == 'Event' && (
              <Button variant="contained" color="warning" onClick={submitFormEvent}>
                Create
              </Button>
            )}
          </Stack>
          {!showAddField && (
            <>
              <TextField
                variant="outlined"
                placeholder="Form Name"
                fullWidth
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                {...(errors.title && {
                  error: true,
                  helperText: errors.title,
                })}
              />
              <FormHelperText sx={{ marginBottom: 2 }}>
                Give a name to identify your form. This name will not be visible to your visitors
              </FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Title"
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
                {...(errors.title && {
                  error: true,
                  helperText: errors.title,
                })}
              />
              <TextField
                variant="outlined"
                placeholder="Title"
                fullWidth
                select
                size="small"
                value={formType}
                label={'Type'}
                onChange={(e) => setFormType(e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="General">General</MenuItem>

                <MenuItem value="Event">Event</MenuItem>
              </TextField>

              <TextField
                variant="outlined"
                placeholder="Description"
                fullWidth
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                {...(errors.description && {
                  error: true,
                  helperText: errors.description,
                })}
                multiline
                minRows={2}
              />
              <Stack sx={{ width: '100%' }} direction={'column'} mt={2}>
                <FormLabel>
                  <strong>Select Primary Color:</strong>
                </FormLabel>
                <TextField
                  sx={{
                    width: { sm: '50%', xs: '40%' },
                    input: { cursor: 'pointer' },
                  }}
                  size="small"
                  type="color"
                  value={primaryColor}
                  variant="outlined"
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </Stack>

              <Stack sx={{ width: '100%' }} direction={'column'} mt={2}>
                <FormLabel>
                  <strong>Select Secondary Color:</strong>
                </FormLabel>
                <TextField
                  sx={{
                    width: { sm: '50%', xs: '40%' },
                    input: { cursor: 'pointer' },
                  }}
                  size="small"
                  variant="outlined"
                  type="color"
                  value={secondarycolor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </Stack>

              <Stack sx={{ width: '100%' }} direction={'column'} mt={2}>
                <FormLabel>
                  <strong>New Banner Image:</strong>
                </FormLabel>
                <TextField
                  sx={{
                    width: { sm: '50%', xs: '40%' },
                    input: { cursor: 'pointer' },
                  }}
                  size="small"
                  variant="outlined"
                  type="file"
                  onChange={onImageChange}
                />
              </Stack>
            </>
          )}
          {showAddField && (
            <>
              <TextField
                placeholder="Field Name"
                {...(errors.fieldname && {
                  error: true,
                  helperText: errors.fieldname,
                })}
                value={fieldname}
                onChange={(e) => setFieldname(e.target.value)}
                sx={{ width: '100%', marginBottom: 2 }}
                size="small"
                disabled={formType == 'Event'}
              />

              <Stack alignItems={'center'} sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" sx={{ marginTop: -1 }}>
                    Type
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    value={type}
                    disabled={formType == 'Event'}
                    onChange={(e) => setType(e.target.value)}
                    {...(errors.type && {
                      error: true,
                      helperText: errors.type,
                    })}
                    size="small"
                    sx={{ width: '100%' }}
                  >
                    <MenuItem value={'text'}>Simple Text</MenuItem>
                    <MenuItem value={'textarea'}>Textarea (long text)</MenuItem>
                    <MenuItem value={'number'}>Number</MenuItem>
                    <MenuItem value={'date'}>Date</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <br />
              <Stack direction={'row'} gap={2}>
                <Button variant="contained" onClick={handleAdd} disabled={formType == 'Event'}>
                  Add Field
                </Button>

                <LoadingButton loading={loading} type="submit" variant="contained" color="warning" onClick={submitForm}>
                  Create Form
                </LoadingButton>
              </Stack>
              {data.length > 0 && (
                <>
                  <Typography variant="body2" mt={3} fontWeight={600}>
                    Added Fields
                  </Typography>

                  <Box width={'100%'} maxHeight={'auto'} border={1} borderColor={'silver'} borderRadius={1} mt={1}>
                    {data?.map((val, i) => {
                      return (
                        <Stack
                          width={'100%'}
                          borderBottom={1}
                          borderColor={'silver'}
                          direction={'row'}
                          justifyContent={'space-between'}
                          padding={1}
                          key={i}
                          borderRadius={1}
                        >
                          <Typography width={'70%'}>{val.fieldname}</Typography>
                          <Iconify
                            icon="material-symbols:cancel"
                            style={{ cursor: 'pointer' }}
                            onClick={() => fieldCancelPressed(i)}
                          />
                        </Stack>
                      );
                    })}
                  </Box>
                </>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} width={'100%'} sx={{ height: '80vh', overflowY: 'scroll' }}>
          <Typography variant="h5">Form Preview</Typography>
          <Template1 form={form} PRIMARY_COLOR={primaryColor} SECONDARY_COLOR={secondarycolor} isPreview={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewFormPage;
