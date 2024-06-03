import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddressContainer from '../address-container/AddressContainer.tsx';
import styles from './ModalAddAddress.module.css';
import { Address, useAddresses, initialAddressError } from '../../../context/AddressesContext.tsx';
import { RegistrationService } from '../../../services/RegistrationService.ts';
import SuccessModal from '../success-modal/SuccessModal.tsx';

type ModalAddAddressPropsType = {
  editIndex: number;
  updateEditIndex: (index: number) => void;
  setFalseAddingAddress: () => void;
};

function ModalAddAddress({ editIndex, updateEditIndex, setFalseAddingAddress }: ModalAddAddressPropsType) {
  const [open, setOpen] = useState(true);
  const [isValidAddress_, setIsValidAddress_] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const isEditing = editIndex >= 0;
  const addressesState = useAddresses();
  const { setAddresses, currentAddressBilling, addresses } = { ...addressesState };

  const closeModal = () => {
    setOpen(false);
    setFalseAddingAddress();
    updateEditIndex(-1);
    setAddresses({ ...addressesState, currentAddressBilling: { ...initialAddressError, billing: true } });
    setSuccessUpdate(false);
  };

  const handleClose = () => {
    closeModal();
  };

  const isValidAddressCallback = useCallback(
    () =>
      !(
        currentAddressBilling.cityError ||
        currentAddressBilling.countryError ||
        currentAddressBilling.streetError ||
        currentAddressBilling.postalCodeError ||
        !currentAddressBilling.city ||
        !currentAddressBilling.country ||
        !currentAddressBilling.street ||
        !currentAddressBilling.postalCode
      ),
    [currentAddressBilling],
  );

  useEffect(() => {
    setIsValidAddress_(isValidAddressCallback());
  }, [
    currentAddressBilling.country,
    currentAddressBilling.city,
    currentAddressBilling.country,
    currentAddressBilling.street,
    currentAddressBilling.postalCode,
    isValidAddressCallback,
  ]);

  const handleChangeDefaultBilling = () => {
    currentAddressBilling.default = !currentAddressBilling.default;
    setAddresses({
      ...addressesState,
    });
  };

  function checkDefaultAddress(addresses: Address[]) {
    if (currentAddressBilling.default) {
      addresses.forEach((address) => {
        if (address.default) {
          if (address.billing && currentAddressBilling.billing) {
            address.default = false;
          } else if (address.shipping && currentAddressBilling.shipping) {
            address.default = false;
          }
        }
      });
    }
  }

  const handleAddAddress = async () => {
    if (!isValidAddressCallback()) return;

    const data = await RegistrationService.addAddress(
      {
        country: currentAddressBilling.country,
        city: currentAddressBilling.city,
        streetName: currentAddressBilling.street,
        postalCode: currentAddressBilling.postalCode,
      },
      currentAddressBilling.billing,
      currentAddressBilling.default,
    );

    checkDefaultAddress(addresses);
    const id = data.customer?.addresses.at(-1)?.id || '';
    addresses.push({ ...currentAddressBilling, key: uuidv4(), id });
    setAddresses({
      ...addressesState,
      addresses: [...addresses],
      currentAddressBilling: { ...initialAddressError, billing: true },
    });

    if (!data.error) {
      setSuccessUpdate(true);
    } else {
      closeModal();
    }
  };

  const handleChangeTypeAddress = () => {
    currentAddressBilling.billing = !currentAddressBilling.billing;
    currentAddressBilling.shipping = !currentAddressBilling.shipping;
    setAddresses({ ...addressesState, ...currentAddressBilling });
  };

  const handleUpdateAddress = async () => {
    if (!isValidAddressCallback()) return;
    const { id, billing } = addresses[editIndex];
    if (!addresses[editIndex].default && currentAddressBilling.default) {
      await RegistrationService.setDefaultAddress(id || '', billing);
    }

    checkDefaultAddress(addresses);
    addresses[editIndex] = { ...currentAddressBilling, key: uuidv4(), id };
    setAddresses({
      ...addressesState,
      addresses: [...addresses],
      currentAddressBilling: { ...initialAddressError, billing: true },
    });

    const data = await RegistrationService.changeAddress(addresses[editIndex].id || '', {
      country: currentAddressBilling.country,
      streetName: currentAddressBilling.street,
      city: currentAddressBilling.city,
      postalCode: currentAddressBilling.postalCode,
    });

    if (!data.error) {
      setSuccessUpdate(true);
    } else {
      closeModal();
    }
  };

  return (
    <>
      {successUpdate && <SuccessModal title="" handleClose={closeModal} />}
      <Dialog open={open}>
        <DialogTitle>{editIndex >= 0 ? 'Editing address' : 'Adding a new address'}</DialogTitle>
        <DialogContent>
          <AddressContainer typeAddress="billing" />
          <div className={styles.checkboxContainer}>
            <FormControlLabel
              control={<Checkbox checked={currentAddressBilling.default} onChange={handleChangeDefaultBilling} />}
              label="Default address"
              disabled={editIndex >= 0 && currentAddressBilling.default}
            />
            <FormControlLabel
              control={<Checkbox checked={currentAddressBilling.billing} onChange={handleChangeTypeAddress} />}
              label="Billing address"
              disabled={editIndex >= 0}
            />
            <FormControlLabel
              control={<Checkbox checked={currentAddressBilling.shipping} onChange={handleChangeTypeAddress} />}
              label="Shipping address"
              disabled={editIndex >= 0}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color="success"
            className={styles.button}
            variant="outlined"
            disabled={!isValidAddress_}
            onClick={isEditing ? handleUpdateAddress : handleAddAddress}>
            {isEditing ? 'Update Address' : 'Add Address'}
          </Button>
          <Button color="error" onClick={handleClose} variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalAddAddress;
