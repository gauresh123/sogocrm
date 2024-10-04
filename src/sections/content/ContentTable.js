import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/iconify/Iconify";
import useAuthContext from "src/context/AuthContext";
import { deleteContent } from "src/helpers/contentHelper";


const ContentTable = ({ openEditPopup, data,openDeleteContent,setOpenDeleteContent }) => {
    const [openPopOver, setOpenPopOver] = useState(null);
    const [editData, setEditData] = useState(null);
    const {currentOrgId}=useAuthContext();

    const handleOpenMenu = (event, val) => {
        setOpenPopOver(event.currentTarget);
        setEditData(val)
    };

    const handleEdit = (val) => {
        openEditPopup(val);
        setOpenPopOver(null);
    }

    const handleDelete = async(val)=>{
        setOpenPopOver(null);

        try{
            const res = await deleteContent(currentOrgId,val?.content_id)
        }finally{
         setOpenDeleteContent(false);   
        }

    }

    const handleCancel = ()=>{
        setOpenPopOver(null);
        setOpenDeleteContent(false);
    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customer table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Content ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((val) => {
                            return (
                                <TableRow >
                                    <TableCell>{val?.content_id}</TableCell>
                                    <TableCell>{val?.content_name}</TableCell>
                                    <TableCell>
                                        {val?.description}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, val)}>
                                            <Iconify icon={'eva:more-vertical-fill'} />
                                        </IconButton>

                                    </TableCell>

                                </TableRow>
                            )
                        })

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Popover
                open={Boolean(openPopOver)}
                anchorEl={openPopOver}
                onClose={() => setOpenPopOver(null)}
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
                <MenuItem onClick={() => handleEdit(editData)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={()=>setOpenDeleteContent(true)}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Dialog
        open={openDeleteContent}
        onClose={()=>setOpenDeleteContent(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            No
          </Button>
          <Button onClick={()=>handleDelete(editData)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

        </>
    )
}


export default ContentTable;