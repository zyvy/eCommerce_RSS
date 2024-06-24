import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle } from '@mui/material';

type SuccessModalPropsType = {
  title: string;
  handleClose: () => void;
};

function SuccessModal({ title, handleClose }: SuccessModalPropsType) {
  const [open, setOpen] = useState(true);

  const handleCloseModal = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            backgroundColor: '#99ca6f',
          },
        }}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.5rem' }}>{title || 'Data was update successfully!'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: '1.5rem' }} onClick={handleCloseModal}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuccessModal;
