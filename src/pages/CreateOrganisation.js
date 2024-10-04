import { CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthContext from '../context/AuthContext';
import { addOrganisation, getUserOrganisations } from '../helpers/organisationsHelper';

function CreateOrganisation() {
  const [creating, setCreating] = useState(false);
  const [organisationName, setOrganisationName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, setOrganisations } = useAuthContext();

  const getOrganisations = async () => {
    await getUserOrganisations(user.userId).then((res) => {
      if (!res.error) {
        setOrganisations(res.data);
      }
    });
  };

  const addNewOrg = async () => {
    setErrors({});
    if (!organisationName) {
      setErrors({ ...errors, organisation: 'Enter a Name' });
      return;
    }
    if (creating) return;
    setCreating(true);
    await addOrganisation(user.userId, organisationName)
      .then(async (res) => {
        if (!res.error) {
          toast.success('Organisation created!');
          await getOrganisations();
          navigate('/crm');
        }
      })
      .finally(() => setCreating(false));
  };
  return (
    <Container>
      <Helmet>Create Organisation</Helmet>
      <Stack alignItems={'center'} sx={{ padding: 2 }}>
        <Typography sx={{ textAlign: 'center' }} mt={1} mb={3} variant="h5">
          Create Organisation
        </Typography>

        <TextField
          placeholder="Name"
          size="small"
          value={organisationName}
          sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
          onChange={(e) => setOrganisationName(e.target.value)}
          {...(errors.organisation && {
            error: true,
            helperText: errors.organisation,
          })}
        />
        <br />
        <LoadingButton
          sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
          size="large"
          type="submit"
          variant="contained"
          onClick={addNewOrg}
        >
          {creating ? <CircularProgress sx={{ color: 'white' }} /> : 'Create'}
        </LoadingButton>
      </Stack>
    </Container>
  );
}

export default CreateOrganisation;
