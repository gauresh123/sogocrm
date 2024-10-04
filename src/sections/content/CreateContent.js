


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
import { addContent } from '../../helpers/contentHelper';
import useAuthContext from '../../context/AuthContext';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

function CreateContent({ open, onClose }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [errors,setErrors]=useState({});
  const {currentOrgId}=useAuthContext()

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async() => {
    if(!name){
      setErrors({...errors,name:"Name is required"});
      return;
    }
    if(!content){
      setErrors({...errors,content:"Content is required"});
      return;
    }

    try{
      const res = await addContent(currentOrgId,name,content);


    }finally{
      setName('');
      setContent('');
      onClose();
      toast.success("Content added!")
    }

  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Content</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the name and content for the template.
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
          label="Content"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={handleContentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button  onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateContent;
