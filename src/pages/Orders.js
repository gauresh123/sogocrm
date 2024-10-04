import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import LoadingContainer from '../components/loader/LoadingContainer';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSheet = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://script.google.com/macros/s/AKfycbwAcEthd2I4powa56G8hMzEPC__OA9vikVpo5dDLatyoEIlda37zvwG0JxYhXnUR7Y/exec'
      );
      const newdata = res.data.data.filter((val, i) => i !== 0);
      setOrders(newdata);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSheet();
  }, []);

  const handleRefresh = async () => {
    await getSheet();
  };

  return (
    <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
      <Button variant="contained" size="small" sx={{ mb: 1 }} onClick={handleRefresh}>
        Refresh
      </Button>
      <LoadingContainer loading={loading}>
        <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" component={'h4'}>
                  Name
                </TableCell>
                <TableCell align="left" component={'h4'}>
                  Number
                </TableCell>
                <TableCell align="left" component={'h4'}>
                  Message
                </TableCell>
                <TableCell align="left" component={'h4'}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((val) => (
                <TableRow key={val.formid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{val?.name}</TableCell>
                  <TableCell align="left">{val?.mobilenumber}</TableCell>
                  <TableCell align="left">{val?.message}</TableCell>
                  <TableCell align="left">{format(new Date(val?.date_time), 'dd-MM-yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </LoadingContainer>
    </Container>
  );
};

export default Orders;
