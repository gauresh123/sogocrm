import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Button, Container, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { editCustomer, getCustomerById } from 'src/helpers/customerHelper';
import useAuthContext from 'src/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
import LoadingContainer from '../components/loader/LoadingContainer';





const EditCustomer = () => {
  const { customerId } = useParams();
  const { currentOrgId } = useAuthContext();
  const [loading,setLoading]=useState(false);
  const [data, setData] = useState({
    customer_id: '',
    first_name: '',
    phone: '',
    event_date: '',
    event_type: '',
    /*first_name: '' ,
    last_name : '',
    email: '',
    accepts_email_marketing: false, 
    company: '', 
    address_1 : '',
    address_2 : '', 
    city : '', province : '', country_code : '', zip : '', phone : '',
     accepts_sms_marketing : false, total_spent : '', total_orders : '', 
     tags : [''], 
     note : '', 
     tax_exempt : false*/
  });

  const navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    await editCustomer(currentOrgId, customerId, data?.first_name, data?.phone, data?.event_date, data?.event_type)
      .then((res) => {
        if (!res.error) {
          toast.success('Customer details edited Successfully');
        }
      })
      .finally(() => {
        navigate(-1);
      });
  };

  const getCustomerData = async () => {
    try {
      setLoading(true)
      const result = await getCustomerById(currentOrgId, customerId);
      if (result?.data?.tags?.length === 0) {
        const newData = { ...result.data };
        newData.tags = [''];
        setData(newData);
      } else {
        console.log(result?.data)
        setData(result?.data);
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  console.log(data, 'datas');
  useEffect(() => {
    getCustomerData();
  }, [currentOrgId,customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      const splittedValues = value.split(',');
      setData((prevData) => ({
        ...prevData,
        [name]: splittedValues,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChecked = (e) => {
    const { checked, name } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <>
      <Helmet>
        <title>SOGO CRM </title>
      </Helmet>
      <LoadingContainer loading={loading}>
      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Edit Customer
        </Typography>
        <form onSubmit={formSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="full_name"
                value={data?.first_name}
                name="first_name"
                label="Full Name "
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="phone"
                value={data?.phone}
                name="mobile"
                label="Phone "
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="event_date"
                type="date"
                label="Event date"
                value={data?.event_date}
                name="event_date"
                fullWidth
                variant="standard"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: 'dd-mm-yyyy',
                }}
          
          
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="event_type"
                value={data?.event_type}
                name="event_type"
                label="Event Type"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            {/*<Grid item xs={12} sm={6}>
              <TextField id="firstName" value={data?.first_name} name="first_name" label='First Name' fullWidth  variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="lastName" value={data?.last_name} name="last_name" label="Last name" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address1" value={data?.address_1} name="address_1" label="Address line 1" fullWidth variant="standard" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="address2" name="address_2" value={data?.address_2} label="Address line 2" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required id="company" value={data?.company} name="company" label="company" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="email" name="email" value={data?.email} label="Email" fullWidth variant="standard" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="phone" name="phone"  value={data?.phone}  label="phone" fullWidth variant="standard"  onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="city" name="city" value={data?.city} label="City" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="province"  value={data?.province}  label="State/Province/Region" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="zip" value={data?.zip}   name="zip" label="Zip / Postal code" fullWidth variant="standard" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="country" name="country_code"  value={data?.country_code}   label="Country" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  id="totalSpent"
                  name="total_spent"
                  label="Total Spent"
                  type="number"
                  value={data?.total_spent}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
              />

            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  id="totalOrders"
                  name="total_orders"
                  label="Total Order"
                  type="number"
                  value={data?.total_orders}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" value={data?.note} label="Note" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField id="tags" name="tags" value={data?.tags} label="Tags" fullWidth variant="standard" onChange={handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel

                control={<Checkbox color="secondary" checked={data?.accepts_email_marketing} name="accepts_email_marketing" value="yes" onChange={handleChecked}/>}
                label="Accept email marketing"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="accepts_sms_marketing" checked={data?.accepts_sms_marketing} value="yes" onChange={handleChecked} />}
                label="Accept sms marketing"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox color="secondary"  checked={data?.tax_exempt}  name="tax_exempt" value="yes" onChange={handleChecked} />}
                label="Tax Exempt"
              />
            </Grid>  */}
          </Grid>
          <Box display="flex" justifyContent="right" spacing={6}>
            <Button type="submit" variant="contained" sx={{ float: 'right', marginTop: 2 }}>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
      </LoadingContainer>
    </>
  );
};

export default EditCustomer;
