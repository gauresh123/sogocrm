import React, { useEffect, useRef, useState } from 'react';
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
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getSubmissionData, getSubmissions } from '../helpers/formHelper';
import { format } from 'date-fns';
import LoadingContainer from '../components/loader/LoadingContainer';
import useAuthContext from '../context/AuthContext';
import Iconify from '../components/iconify';
import ReactToPrint from 'react-to-print';

const Submissions = () => {
  const { formId } = useParams();
  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [headers, setHeaders] = useState([]);
  const { currentOrgId } = useAuthContext();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const getData = async () => {
    try {
      setLoading(true);
      const groupedData = {};
      const res = await getSubmissionData(currentOrgId, formId);
      console.log(res.data);

      let uniqueHeaders = Array.from(new Set(res.data?.map((item) => item.field_name)));
      setHeaders(uniqueHeaders);

      // Loop through the data and group by field_name
      res.data.forEach((item) => {
        const { field_name, field_val } = item;
        if (!groupedData[field_name]) {
          groupedData[field_name] = [field_val];
        } else {
          groupedData[field_name].push(field_val);
        }
      });

      // Convert the groupedData object into an array of objects
      const newData = Object.entries(groupedData).map(([key, value]) => ({
        [key.replace(/\s+/g, '_')]: value,
      }));

      const combinedData = {};

      newData?.forEach((item) => {
        for (const key in item) {
          if (combinedData[key]) {
            combinedData[key].push(...item[key]);
          } else {
            combinedData[key] = [...item[key]];
          }
        }
      });

      const transformedData = [combinedData];

      setSubmissionData(transformedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [formId, currentOrgId]);

  return (
    <>
      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        {/* <Typography variant="h6" gutterBottom>
          {submissionData?.length > 0 && 'Responses'}
        </Typography> */}

        <LoadingContainer loading={loading}>
          {submissionData?.length > 0 && (
            <Stack direction="row" alignItems="center" mb={2} gap={{ sm: 2, xs: 1, md: 2, lg: 2 }}>
              <ReactToPrint
                trigger={() => (
                  <Button variant="contained" size="small">
                    Download
                  </Button>
                )}
                content={() => pdfRef.current}
                documentTitle={'responses'}
              />

              <Button size="small" variant="contained" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Stack>
          )}

          {submissionData.length > 0 && (
            <TableContainer component={Paper} sx={{ minWidth: 900 }}>
              <Table id="table-to-xls" ref={pdfRef} sx={{ borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <TableHead>
                  <TableRow>
                    {headers?.map((val) => {
                      return (
                        <TableCell align={'left'} sx={{ border: '1px solid #ddd' }}>
                          {val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">Customer Signup</TableCell>
                <TableCell align="left">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://crm.thesogo.com/crm/qrcode/addCustomer/${currentOrgId}`}
                    alt="qrcode"
                  />
                </TableCell>
              </TableRow> */}

                  {submissionData?.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Object.keys(submissionData[0])?.map((column, colIndex) => (
                        <TableCell key={colIndex} align={'left'} sx={{ border: '1px solid #ddd' }}>
                          {row[column].map((name, nameIndex) => (
                            <div key={nameIndex} style={{ padding: 10 }}>
                              {name}
                            </div>
                          ))}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </LoadingContainer>
      </Container>
    </>
  );
};

export default Submissions;
