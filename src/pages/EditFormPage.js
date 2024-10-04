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
  Tabs,
  Tab,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthContext from '../context/AuthContext';
import { addForm, editForm, getForms } from '../helpers/formHelper';
import Iconify from '../components/iconify/Iconify';
import Template1 from '../sections/forms/templates/Template1';
import { IMGBBuploadImage, getImageBase64 } from '../helpers/imageHelper';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import useForm from 'src/hooks/useForm';
import LoadingContainer from '../components/loader/LoadingContainer';
import EditFieldpopup from '../sections/forms/EditFieldpopup';
import { object } from 'prop-types';
import { da } from 'date-fns/locale';

const NewFormPage = () => {
  const { formId } = useParams();
  const { currentOrgId } = useAuthContext();
  const { form, loading: formLoading } = useForm(currentOrgId, formId);

  const [showAddField, setShowAddField] = useState(false);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [fieldname, setFieldname] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#2664c9');
  const [secondarycolor, setSecondaryColor] = useState('#eeeeee');
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [image, setImage] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [imgForImagebb, setimgForImagebb] = useState(null);
  const [errors, setErrors] = useState({});
  const [tabval, setTabVal] = useState('1');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editFieldval, setEditfieldval] = useState('');
  const [editType, setEditType] = useState('');
  const [selectedEditVal, setSelectedEditVal] = useState(null);
  const [newfieldval, setNewFieldVal] = useState('');
  const [newType, setNewType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!formLoading && form) {
      setTitle(form?.formtitle);
      setDescription(form?.template?.formtext);
      setPrimaryColor(form?.template?.primaryColor);
      setSecondaryColor(form?.template?.secondarycolor);
      setImage(form?.template?.imageUrl);
      setData(form?.fields);
    }
  }, [formLoading, form]);

  const newObj = {
    fieldname: newfieldval,
    required: true,
    type: newType,
  };

  const formdata = Array.isArray(data) && {
    fields: [...data, ...newData],
    formtitle: title,
    template: {
      title,
      primaryColor,
      secondarycolor,
      imageUrl: imgBase64 || image,
      formtext: description,
      formtype: form?.template?.formtype || 'General',
    },
  };

  const handleAdd = () => {
    if (!newfieldval) {
      setErrors((prev) => ({ ...prev, fieldname: 'fieldname is required' }));
      return;
    }
    if (!newType) {
      setErrors((prev) => ({ ...prev, type: 'type is required' }));
      return;
    }
    setNewData((prev) => [...prev, newObj]);
    setNewType('');
    setNewFieldVal('');
    setTabVal('2');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    let imageUrl = '' || image;
    if (imgForImagebb) {
      const { imgurl, error: imageError } = await IMGBBuploadImage(await getImageBase64(imgForImagebb));
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
    };

    await editForm(
      currentOrgId,
      formId,
      newData,
      template,
      title,
      data?.map((val) => val?.fieldid),
      data?.map((val) => val?.fieldname),
      data?.map((val) => val?.type),
      data?.map((val) => val?.required)
    )
      .then((res) => {
        if (!res.error) {
          toast.success('Form edited Successfully');
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
      setimgForImagebb(file);
      const data = new FileReader();
      data.addEventListener('load', () => {
        setImgBase64(data.result);
      });
      data.readAsDataURL(e.target.files[0]);
    }
  };
  const fieldCancelPressed = (index) => {
    setNewData((prev) => prev.filter((val, i) => index !== i));
  };

  const tabChanged = (event, val) => {
    setTabVal(val);
  };

  const editField = (val) => {
    let testdata = [...data];
    let object = testdata.find((value) => value.fieldname == val.fieldname);
    object.fieldname = editFieldval;
    object.type = editType;
    setData([...testdata]);
    setShowEditPopup(false);
  };

  const editHandlePressed = (val) => {
    setShowEditPopup(true);
    setSelectedEditVal(val);
    setEditfieldval(val.fieldname);
    setEditType(val.type);
  };
  return (
    <LoadingContainer loading={formLoading}>
      <>
        <Box sx={{ marginTop: { sm: -3, xs: -1 } }}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} width={'100%'} padding={2} height={'100vh'} sx={{ marginTop: { xs: 2 } }}>
              <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
                <Typography variant="h5">Edit</Typography>
                <Button variant="contained" onClick={nextHandlePress}>
                  {!showAddField ? 'Next' : 'Back'}
                </Button>
              </Stack>
              {!showAddField && (
                <>
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
                    value={newfieldval}
                    onChange={(e) => setNewFieldVal(e.target.value)}
                    sx={{ width: '100%', marginBottom: 2 }}
                    size="small"
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
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
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
                    <Button variant="contained" onClick={handleAdd}>
                      Add Field
                    </Button>

                    <LoadingButton
                      loading={loading}
                      type="submit"
                      variant="contained"
                      color="warning"
                      onClick={submitForm}
                    >
                      Update Form
                    </LoadingButton>
                  </Stack>
                  {
                    <TabContext value={tabval}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={tabChanged} aria-label="basic tabs example">
                          <Tab label="Current Fields" value={'1'} />
                          <Tab label="New Fields" value={'2'} />
                        </TabList>
                      </Box>

                      <TabPanel value="1">
                        <Box
                          width={'100%'}
                          maxHeight={'auto'}
                          border={1}
                          borderColor={'silver'}
                          borderRadius={1}
                          //mt={1}
                        >
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
                                  icon="material-symbols:edit"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => editHandlePressed(val)}
                                />
                              </Stack>
                            );
                          })}
                        </Box>
                      </TabPanel>

                      <TabPanel value="2">
                        <Box
                          width={'100%'}
                          maxHeight={'auto'}
                          border={1}
                          borderColor={'silver'}
                          borderRadius={1}
                          // mt={1}
                        >
                          {newData?.map((val, i) => {
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
                                <Typography width={'70%'}>{val?.fieldname}</Typography>
                                <Iconify
                                  icon="material-symbols:cancel"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => fieldCancelPressed(i)}
                                />
                              </Stack>
                            );
                          })}
                        </Box>
                      </TabPanel>
                    </TabContext>
                  }
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={6} width={'100%'} sx={{ height: '80vh', overflowY: 'scroll' }}>
              <Typography variant="h5">Form Preview</Typography>
              <Template1
                form={formdata}
                PRIMARY_COLOR={primaryColor}
                SECONDARY_COLOR={secondarycolor}
                isPreview={true}
              />
            </Grid>
          </Grid>
        </Box>
      </>
      {showEditPopup && (
        <EditFieldpopup
          editFieldval={editFieldval}
          editType={editType}
          setEditfieldval={(val) => setEditfieldval(val)}
          setEditType={(val) => setEditType(val)}
          showEditPopup={showEditPopup}
          setShowEditPopup={(val) => setShowEditPopup(val)}
          editField={() => editField(selectedEditVal)}
        />
      )}
    </LoadingContainer>
  );
};

export default NewFormPage;
