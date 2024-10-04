import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import useAuthContext from '../../../context/AuthContext';
import { LoadingButton } from '@mui/lab';
import { addCategory, deleteCategory, getCategories } from '../../../helpers/qrCodeHelper';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../axiosInstance';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Categories({ selectedCategories, setSelectedCategories, refresh, setRefresh }) {
  const [showAddNewFolder, setShowAddNewFolder] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(null);
  const [showNewCateGory, setShowNewCateGory] = useState(false);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentOrgId } = useAuthContext();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCategories(true);
        const { data } = await axiosInstance.get(`/crm/${currentOrgId}/category`);
        setCategories(data.data);
        if (data.data.length == 0) {
          setShowNewCateGory(true);
        }
      } catch {
        setLoadingCategories(false);
      } finally {
        //
      }
    };
    getCategories();
  }, [currentOrgId, showNewCateGory, loadingCategories]);

  const handleAddClicked = async () => {
    if (!newCategory) {
      setError({ ...error, category: 'category is required' });
      return;
    }
    if (!currentOrgId) return;
    try {
      setLoading(true);
      const res = await addCategory(currentOrgId, newCategory);
      if (!res.error) {
        toast.success(`${newCategory} is successfully added to categories`);
      }
    } catch {
      //
    } finally {
      setLoading(false);
      await getCategories(currentOrgId).then((res) => {
        if (res.data) {
          setShowNewCateGory(false);
          setRefresh(true);
        }
      });
    }
  };

  const getSelectedCategoryNames = (val) => {
    return val?.map((value) => categories.find((category) => category?.categoryid === value)?.name).join(', ');
  };
  const popupClosed = () => {
    setShowAddNewFolder(false);
    setShowNewCateGory(false);
  };

  const deleteCategoryHandle = async (id, name) => {
    try {
      setLoadingCategories(true);
      const res = await deleteCategory(currentOrgId, id);
      if (!res.error) {
        toast.success(`${name} is successfully deleted`);
      }
    } catch {
      //
    } finally {
      await getCategories(currentOrgId).then((res) => {
        if (!res.error) {
          setShowNewCateGory(false);
          setLoadingCategories(false);
          setRefresh(true);
          setSelectedCategories([]);
        }
      });
    }
  };
  return (
    <div>
      <Stack direction={'row'} gap={2} mb={{ xs: 2 }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label" sx={{ mt: -1 }}>
            Categories
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={<OutlinedInput label="Categories" />}
            variant="standard"
            renderValue={(selected) => getSelectedCategoryNames(selected)}
            MenuProps={MenuProps}
            size="small"
          >
            {categories &&
              categories?.map((name) => (
                <MenuItem key={name.categoryid} value={name.categoryid}>
                  <Checkbox checked={selectedCategories.indexOf(name.categoryid) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            {categories?.length == 0 && <MenuItem onClick={() => setShowAddNewFolder(true)}>Add category</MenuItem>}
          </Select>
        </FormControl>
        <Button variant="contained" size="small" onClick={() => setShowAddNewFolder(true)}>
          <Iconify icon={'material-symbols-light:category'} />
        </Button>
      </Stack>

      <Dialog open={showAddNewFolder} onClose={popupClosed} sx={{ padding: 1 }}>
        {showNewCateGory && (
          <>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <DialogTitle>Add New Category</DialogTitle>
              {categories?.length > 0 && (
                <Button onClick={() => setShowNewCateGory(false)}>
                  <Iconify icon="ep:back" />
                </Button>
              )}
            </Stack>
            <DialogContent sx={{ width: '100%' }}>
              <TextField
                size="small"
                placeholder="Category Name"
                fullWidth
                onChange={(e) => setNewCategory(e.target.value)}
                {...(error.category && {
                  error: true,
                  helperText: error.category,
                })}
              />
            </DialogContent>
            <DialogActions sx={{ width: '100%' }}>
              <LoadingButton
                loading={loading}
                variant="contained"
                size="small"
                sx={{ width: '100%' }}
                onClick={handleAddClicked}
              >
                Add
              </LoadingButton>
            </DialogActions>
            {/* <Button variant="contained" size="small" sx={{ margin: 1 }}>
            Add New Folder
          </Button>*/}
          </>
        )}
        {!showNewCateGory && (
          <>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <DialogTitle>My Categories</DialogTitle>
              <Button onClick={() => setShowNewCateGory(true)}>
                <Iconify icon="eva:plus-fill" />
              </Button>
            </Stack>
            <DialogContent sx={{ mt: -1 }}>
              {categories?.map((name) => {
                return (
                  <MenuItem
                    sx={{ justifyContent: 'space-between' }}
                    onClick={() => deleteCategoryHandle(name?.categoryid, name?.name)}
                    key={name?.categoryid}
                  >
                    <ListItemText primary={name.name} />
                    <Iconify icon="material-symbols:delete" />
                  </MenuItem>
                );
              })}
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}
