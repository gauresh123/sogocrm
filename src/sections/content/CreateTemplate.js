import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { addTemplate } from 'src/helpers/contentHelper';
import useAuthContext from 'src/context/AuthContext';
import { toast } from 'react-toastify';

function CreateTemplate({ open, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const { currentOrgId } = useAuthContext();


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }
    if (!description) {
      setErrors({ ...errors, content: "Description is required" });
      return;
    }

    try {
      const res = await addTemplate(currentOrgId, name, description);

    } finally {
      setName("");
      setDescription("");
      onClose();
      toast.success("Template created!")
    }

  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Template</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the name and description for the template.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
          size='small'
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={2}
          value={description}
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTemplate;
