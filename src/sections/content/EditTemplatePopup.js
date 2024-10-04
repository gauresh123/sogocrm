import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { editTemplate } from 'src/helpers/contentHelper';
import useAuthContext from 'src/context/AuthContext';
import { toast } from 'react-toastify';

function EditTemplate({ open, onClose,data }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors,setErrors]=useState({});
  const {currentOrgId}=useAuthContext();


  useEffect(() => {
    if (data) {
      setName(data.template_name || "");
      setDescription(data.description || "");
    }
  }, [data]);



  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async() => {
    if(!name){
      setErrors({...errors,name:"Name is required"});
      return;
    }
    if(!description){
      setErrors({...errors,content:"Description is required"});
      return;
    }
    try{
      const res = await editTemplate(currentOrgId, name,description, data?.template_id)
    }finally{
      onClose();
      toast.success("Template edited!")
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Template</DialogTitle>
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
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTemplate;
