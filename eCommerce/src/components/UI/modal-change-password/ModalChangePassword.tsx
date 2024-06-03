import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputPassword from '../inputs/input-password/InputPassword.tsx';
import InputText from '../inputs/input-text/InputText.tsx';
import { RegistrationService } from '../../../services/RegistrationService.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import SuccessModal from '../success-modal/SuccessModal.tsx';
import styles from './ModalChangePassword.module.css';

function handleOldPassword(
  e: React.ChangeEvent<HTMLInputElement>,
  setOldPassword: React.Dispatch<React.SetStateAction<string>>,
) {
  setOldPassword(e.target.value);
}

function ModalChangePassword() {
  const auth = useAuth();
  const { setAuth, password, passwordError } = { ...auth };
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [successUpdate, setSuccessUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAuth({ ...auth, password: '' });
    setSuccessUpdate(false);
  };

  const handleInputOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOldPassword(e, setOldPassword);
    setChangePasswordError('');
  };

  const handleChangePassword = async () => {
    const response = await RegistrationService.changePassword(oldPassword, password);
    if (!response.error) {
      setSuccessUpdate(true);
    } else {
      setChangePasswordError(response.errorDescription);
    }
  };

  return (
    <>
      {successUpdate && <SuccessModal title="Password was update successfully!" handleClose={handleClose} />}
      <Button variant="outlined" onClick={handleClickOpen}>
        Change password
      </Button>
      <Dialog open={open}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <div className={styles.changePassword}>
            <InputText
              label="current password"
              errorText={changePasswordError}
              handleOnInput={handleInputOldPassword}
            />
            <InputPassword size="small" label="new password" />
          </div>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            sx={{ width: '90px' }}
            color="success"
            disabled={!oldPassword || !password || passwordError}
            variant="outlined"
            onClick={handleChangePassword}>
            Update
          </Button>

          <Button color="error" onClick={handleClose} variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalChangePassword;
