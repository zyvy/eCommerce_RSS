/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle } from '@mui/material';

function SuccessModal({ title = 'Data was update successfully!' }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#99ca6f',
          },
        }}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.5rem' }}>{title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: '1.5rem' }} onClick={handleClose}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuccessModal;
