import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const EditFieldpopup = ({
  showEditPopup,
  setShowEditPopup,
  editFieldval,
  editType,
  setEditfieldval,
  setEditType,
  editField,
}) => {
  const [errors, setErrors] = useState({});

  const editHandlePress = () => {
    if (!editFieldval) {
      setErrors((prev) => ({ ...prev, fieldname: 'fieldname is required' }));
      return;
    }

    editField();
  };
  return (
    <Dialog open={showEditPopup} onClose={() => setShowEditPopup(false)} sx={{ width: '100%' }}>
      <Stack padding={2} direction={'column'} gap={3}>
        <Typography variant="h6">Edit Field</Typography>
        <TextField
          placeholder="Field Name"
          value={editFieldval}
          onChange={(e) => setEditfieldval(e.target.value)}
          size="small"
          sx={{ width: { lg: '500px', sm: '100%', xs: '100%' } }}
          {...(errors.fieldname && {
            error: true,
            helperText: errors.fieldname,
          })}
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
              size="small"
              sx={{ width: { lg: '500px', sm: '100%', xs: '100%' } }}
              onChange={(e) => setEditType(e.target.value)}
              value={editType}
            >
              <MenuItem value={'text'}>Simple Text</MenuItem>
              <MenuItem value={'textarea'}>Textarea (long text)</MenuItem>
              <MenuItem value={'number'}>Number</MenuItem>
              <MenuItem value={'date'}>Date</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button sx={{ width: '100%' }} variant="contained" onClick={editHandlePress}>
          Edit Field
        </Button>
      </Stack>
    </Dialog>
  );
};

export default EditFieldpopup;
