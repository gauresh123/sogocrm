import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Button,
  TextField,
  InputLabel,
  Pagination,
} from '@mui/material';
// components
import { NavLink } from 'react-router-dom';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import useAuthContext from '../context/AuthContext';
import LoadingContainer from '../components/loader/LoadingContainer';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';
import { removeSpacesFromKeys } from '../utils/removeSpacesFromKeys';
import { deleteCustomer, getCustomers, importCustomers } from '../helpers/customerHelper';
import { mt } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { testEmailCampign } from '../helpers/testingCampaignHelper';
import { parse } from 'date-fns';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fname', label: 'Full Name', alignRight: false },
  // { id: 'lname', label: 'Last Name', alignRight: false },
  // { id: 'email', label: 'Email', alignRight: false },
  // { id: 'sendEmail', label: 'Send', alignRight: false },
  // { id: 'aemailmarketing?', label: 'Accepts Email Marketing', alignRight: false },
  // { id: 'company', label: 'Company', alignRight: false },
  // { id: 'address1', label: 'Address1', alignRight: false },
  // { id: 'address2', label: 'Address2', alignRight: false },
  // { id: 'city', label: 'City', alignRight: false },
  // { id: 'province', label: 'Province', alignRight: false },
  // { id: 'country', label: 'Country', alignRight: false },
  // { id: 'ccode', label: 'Country Code', alignRight: false },
  // { id: 'zip', label: 'Zip', alignRight: false },
  // { id: 'phone', label: 'Phone', alignRight: false },
  // { id: 'asmsmarketing?', label: 'Accepts SMS Marketing', alignRight: false },
  // { id: 'totalspent', label: 'Total Spent', alignRight: false },
  // { id: 'totalorders', label: 'Total Orders', alignRight: false },
  // { id: 'tags', label: 'Tags', alignRight: false },
  // { id: 'notes', label: 'Notes', alignRight: false },
  // { id: 'taxexempt', label: 'Tax Exempt', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'event_type', label: 'Event Type', alignRight: false },
  { id: 'event_date', label: 'Event Date', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const allowedExtensions = ['csv'];

export default function Customers() {
  const { currentOrgId } = useAuthContext();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);
  const [customerId, setCustomerId] = useState('');

  const getCustomerList = async () => {
    setLoading(true);
    try {
      const result = await getCustomers(currentOrgId, page);
      console.log(result?.data);
      setCustomers(result?.data);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, [currentOrgId, page]);

  const handleOpenMenu = (event, customer) => {
    setOpen(event.currentTarget);
    setCustomerId(customer?.customer_id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value.toLowerCase());
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  //  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const filteredCustomers = useMemo(
    () =>
      customers?.filter(
        (customer) =>
          customer?.phone?.includes(filterName) || customer?.first_name.toLowerCase().includes(filterName) || ''
      ),
    [customers, filterName]
  );
  const isNotFound = !filteredCustomers?.length && !filterName;
  console.log(filteredCustomers);
  const handleImport = async (e) => {
    let file;
    if (e.target.files.length) {
      let inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split('/')[1];
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error('Please select a valid file type');
        return;
      }
      file = inputFile;
    }

    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    setLoadingButton(true);
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      //const columns = Object.keys(parsedData[0]);

      const data = parsedData.map((obj) => removeSpacesFromKeys(obj));
      console.log(data);

      const updatedData = data
        .filter((val) => val?.FirstName !== '')
        ?.map((val) => {
          const updatedItem = {
            first_name: val.FirstName,

            last_name: val.LastName,

            city: val.City,

            phone: val.Phone,

            province: val.Province,

            tags: val.Tags ? val.Tags.split(',') : [],

            tax_exempt: val.TaxExempt || false,

            total_orders: val.TotalOrders || 0,

            total_spent: val.TotalSpent || 0,

            zip: val.Zip,

            country_code: val.CountryCode,

            company: val.Company,

            address_1: val.Address1,

            address_2: val.Address2,

            accepts_email_marketing: val.AcceptsEmailMarketing || false,
            note: val.Note,

            email: val.Email,
            event_date: val.EventDate.split('-').reverse().join('-'),
            event_type: val.EventType,
          };
          return updatedItem;
        });
      console.log(updatedData);
      const result = await importCustomers(currentOrgId, updatedData);
      if (!result.error) {
        getCustomerList();
        toast.success('Data imported');
        setLoadingButton(false);
      }
    };
    reader.readAsText(file);
  };

  const pageChange = (event, value) => {
    setPage(value);
  };

  const headers = [
    { key: 'fname', label: 'First Name' },
    // { key: 'lname', label: 'Last Name' },
    // { key: 'email', label: 'Email' },
    // { key: 'aemailmarketing?', label: 'Accepts Email Marketing' },
    // { key: 'company', label: 'Company' },
    // { key: 'address1', label: 'Address1' },
    // { key: 'address2', label: 'Address2' },
    // { key: 'city', label: 'City' },
    // { key: 'province', label: 'Province' },
    // { key: 'ccode', label: 'Country Code' },
    // { key: 'zip', label: 'Zip' },
    { key: 'phone', label: 'Phone' },
    // { key: 'asmsmarketing?', label: 'Accepts SMS Marketing' },
    // { key: 'totalspent', label: 'Total Spent' },
    // { key: 'totalorders', label: 'Total Orders' },
    // { key: 'tags', label: 'Tags' },
    // { key: 'notes', label: 'Notes' },
    // { key: 'taxexempt', label: 'Tax Exempt' },
    { key: 'event_date', label: 'Event Date' },
    { key: 'event_type', label: 'Event Type' },
  ];

  let data = [
    {
      testData: '',
      testData: '',
      testData: '',
      testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
      // testData: '',
    },
  ];
  const mailSendPressed = async (val) => {
    setLoadingMail(true);
    const res = await testEmailCampign(val.email, val.first_name);
    if (res.success) {
      toast.success(res.success);
      setLoadingMail(false);
    }
  };

  const handleDelete = async () => {
    setOpen(false);
    const res = await deleteCustomer(currentOrgId, customerId);
    if (!res?.error) {
      getCustomerList();
      toast.success('Customer is deleted successfully.');
    }
  };
  return (
    <>
      <Helmet>
        <title>SOGO</title>
      </Helmet>

      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Stack direction="row" alignItems="center" mb={3} gap={{ sm: 2, xs: 1, md: 2 }}>
          {/*<Button
            component={NavLink}
            to="/app/newcustomer"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Customer
  </Button>*/}

          <CSVLink headers={headers} data={data} filename="template.csv">
            <Button variant="contained" startIcon={<Iconify icon="material-symbols:download" />}>
              Template
            </Button>
          </CSVLink>
          <LoadingButton variant="contained" component="label" loading={loadingButton}>
            Import
            <TextField type="file" id="file" onChange={handleImport} sx={{ display: 'none' }} />
          </LoadingButton>
          {/* {<Button
            variant="contained"
            component="a"
            target="_blank"
            href={process.env.REACT_APP_SOGO_API + `/crm/${currentOrgId}/customers/export`}
          >
            Export
          </Button>} */}
        </Stack>
        <LoadingContainer loading={loading}>
          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer component={Paper} sx={{ minWidth: 900, padding: 1 }}>
                <Table sx={{ tableLayout: 'auto' }}>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={customers?.length}
                    numSelected={selected?.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredCustomers?.map((customer, idx) => (
                      <TableRow hover key={idx} tabIndex={-1} role="checkbox">
                        {/* <TableCell padding="checkbox">
                        <Checkbox checked={false} />
                      </TableCell> */}

                        {/*<TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" paddingLeft={2} alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {customer.customerid}
                            </Typography>
                          </Stack>
                    </TableCell>*/}

                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.first_name || 'NA'}
                        </TableCell>
                        {/*
                        <>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.last_name}
                        </TableCell>

                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.email || 'NA'}
                        </TableCell>

                        <TableCell
                          align="left"
                          sx={{ maxWidth: 100, cursor: 'pointer' }}
                          onClick={() => mailSendPressed(customer)}
                        >
                          <Iconify icon="material-symbols:mail" />
                        </TableCell>

                        <TableCell align="center" sx={{ maxWidth: 100 }}>
                          {customer.accepts_email_marketing == true ? 'Yes' : 'No' || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.company || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.address_1 || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.address_2 || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.city || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.province || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.country || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.country_code}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.zip || 'NA'}
                        </TableCell>
                        <TableCell align="center" sx={{ maxWidth: 100 }}>
                          {customer.accepts_sms_marketing == true ? 'Yes' : 'No' || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.total_spent || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.total_orders || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.tags?.join(',')}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.note || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.tax_exempt || 'NA'}
                        </TableCell>
                        </>*/}
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.phone || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.event_type || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          {customer.event_date || 'NA'}
                        </TableCell>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, customer)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
                <br />
                {customers?.length > 100 && (
                  <Pagination
                    count={customers?.length == 200 ? 2 : 5}
                    variant="outlined"
                    onChange={pageChange}
                    page={page}
                  />
                )}
              </TableContainer>
            </Scrollbar>

            {/*<TablePagination
              rowsPerPageOptions={[1, 2, 3]}
              component="div"
              count={filteredCustomers?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
                          />*/}
          </Card>
        </LoadingContainer>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem component={NavLink} to={`/app/customers/editCustomer/${customerId}`}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
