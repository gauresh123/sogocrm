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
import { editContent} from 'src/helpers/contentHelper';
import useAuthContext from 'src/context/AuthContext';
import { toast } from 'react-toastify';


function EditContent({ open, onClose, data }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const { currentOrgId } = useAuthContext();

  console.log(data)
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setName(data.content_name || "");
      setContent(data.description || "");
    }
  }, [data]);


  const handleSubmit = async () => {
    if (!name) {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }
    if (!content) {
      setErrors({ ...errors, content: "Content is required" });
      return;
    }
    try {
      const res = await editContent(currentOrgId, name, content, data?.content_id)
    } finally {
      onClose();
      toast.success("Content edited!");
    }

  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Content</DialogTitle>
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
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditContent;
