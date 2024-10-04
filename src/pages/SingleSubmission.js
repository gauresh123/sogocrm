import React, { useEffect, useRef, useState } from 'react';
import useAuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Table, Typography, Stack, Grid, Card, Button } from '@mui/material';
import LoadingContainer from '../components/loader/LoadingContainer';
import { getSubmission } from '../helpers/formHelper';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';

const SingleSubmission = () => {
  const [singleSubmission, setSingleSubmission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const { submissionId } = useParams();
  const { currentOrgId } = useAuthContext();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const getSubmissionDetail = async () => {
    try {
      setLoading(true);
      const res = await getSubmission(currentOrgId, submissionId);
      if (!res.error) {
        setSingleSubmission(res.data);
        setDate(res.data[0].date);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubmissionDetail();
  }, [currentOrgId, submissionId]);

  return (
    <>
      <Container sx={{ marginTop: { sm: -3, xs: -1 }, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Response Details
        </Typography>
        <LoadingContainer loading={loading}>
          {/*<TableContainer component={Paper}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#002984' }}>
                <TableRow>
                  <Stack direction={'column'}>
                    {singleSubmission?.map((val, i) => (
                      <TableCell align="left">{val.field}</TableCell>
                    ))}
                  </Stack>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <Stack direction={'column'}>
                    {singleSubmission?.map((val, i) => (
                      <TableCell align="left">{val.value}</TableCell>
                    ))}
                  </Stack>
                </TableRow>
              </TableBody>
            </Table>
                    </TableContainer>*/}
          {singleSubmission && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8}>
                <Card sx={{ height: '100%', width: '100%' }}>
                  <Stack spacing={2} p={2} ref={pdfRef} pb={2}>
                    <Typography variant="body2">
                      Id: <strong>{singleSubmission[0]?.formid}</strong>
                    </Typography>
                    {date && (
                      <Typography variant="body2">
                        Date: <strong>{format(new Date(date), 'dd-MM-yyyy')}</strong>
                      </Typography>
                    )}
                    {singleSubmission?.map((val, i) => (
                      <Typography variant="body2">
                        {val.field}: <strong>{val.value}</strong>
                      </Typography>
                    ))}
                  </Stack>
                  <Stack direction={'row'}>
                    {date && (
                      <ReactToPrint
                        trigger={() => (
                          <Button variant="contained" size="small" sx={{ mb: 2, ml: 2 }}>
                            Download
                          </Button>
                        )}
                        content={() => pdfRef.current}
                        documentTitle={`${format(new Date(date), 'dd-MM-yyyy')}`}
                      />
                    )}
                    <Button variant="contained" size="small" sx={{ mb: 2, ml: 2 }} onClick={() => navigate(-1)}>
                      Back
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          )}
        </LoadingContainer>
      </Container>
    </>
  );
};

export default SingleSubmission;
