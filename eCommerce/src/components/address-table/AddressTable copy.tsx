import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditOffTwoToneIcon from '@mui/icons-material/EditOffTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Address, initialAddressError, useAddresses } from '../../context/AddressesContext.tsx';
import { getCountry } from '../../utils/currencies.ts';
import AddressContainer from '../UI/address-container/AddressContainer.tsx';
import styles from './AddressTable.module.css';
import DividerWithText from '../UI/divider-with-text/DividerWithText.tsx';

type AddressFormPropsType = {
  editIndex: number;
  updateEditIndex: (index: number) => void;
};

function AddressForm({ editIndex, updateEditIndex }: AddressFormPropsType) {
  const addressesState = useAddresses();
  const { setAddresses, currentAddressBilling, addresses } = { ...addressesState };

  const isEditing = editIndex >= 0;

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

  const handleChangeDefaultBilling = () => {
    currentAddressBilling.default = !currentAddressBilling.default;
    setAddresses({
      ...addressesState,
    });
  };

  const handleUpdateAddress = () => {
    checkDefaultAddress(addresses);
    const { id } = addresses[editIndex];
    addresses[editIndex] = { ...currentAddressBilling, key: uuidv4(), id };
    setAddresses({ ...addressesState, ...addresses, currentAddressBilling: { ...initialAddressError, billing: true } });
    updateEditIndex(-1);
  };

  const handleAddAddress = () => {
    checkDefaultAddress(addresses);
    addresses.push({ ...currentAddressBilling });
    setAddresses({ ...addressesState, currentAddressBilling: { ...initialAddressError, billing: true } });
  };

  const handleChangeTypeAddress = () => {
    currentAddressBilling.billing = !currentAddressBilling.billing;
    currentAddressBilling.shipping = !currentAddressBilling.shipping;
    setAddresses({ ...addressesState, ...currentAddressBilling });
  };

  return (
    <div>
      <DividerWithText text={editIndex >= 0 ? 'Edit Address' : 'Add Address'} />
      <form>
        <AddressContainer typeAddress="billing" />
        <div className={styles.checkboxContainer}>
          <FormControlLabel
            control={<Checkbox checked={currentAddressBilling.default} onChange={handleChangeDefaultBilling} />}
            label="Default address"
          />
          <FormControlLabel
            control={<Checkbox checked={currentAddressBilling.billing} onChange={handleChangeTypeAddress} />}
            label="Billing address"
          />
          <FormControlLabel
            control={<Checkbox checked={currentAddressBilling.shipping} onChange={handleChangeTypeAddress} />}
            label="Shipping address"
          />
        </div>

        <div>
          <Button
            className={styles.button}
            variant="outlined"
            onClick={isEditing ? handleUpdateAddress : handleAddAddress}>
            {isEditing ? 'Update Address' : 'Add Address'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function AddressTable() {
  const addressesState = useAddresses();

  const { setAddresses, addresses } = { ...addressesState };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEditAddress = (index: number) => {
    if (editIndex === index) {
      console.log(index);
      setEditIndex(-1);
      setAddresses({ ...addressesState, currentAddressBilling: { ...initialAddressError, billing: true } });
      return;
    }
    setAddresses({
      ...addressesState,
      currentAddressBilling: {
        ...addresses[index],
        countryError: '',
        cityError: '',
        streetError: '',
        postalCodeError: '',
        key: uuidv4(),
      },
    });
    setEditIndex(index);
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses({ ...addressesState, addresses: updatedAddresses });
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHead}>Country</th>
            <th className={styles.tableHead}>City</th>
            <th className={styles.tableHead}>Street</th>
            <th className={styles.tableHead}>Postal Code</th>
            <th className={styles.tableHead}>Default</th>
            <th className={styles.tableHead}>Type</th>
            <th className={styles.tableHead}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={address.key}>
              <td className={styles.tableData}>{getCountry(address.country)}</td>
              <td className={styles.tableData}>{address.city}</td>
              <td className={styles.tableData}>{address.street}</td>
              <td className={styles.tableData}>{address.postalCode}</td>
              <td className={styles.tableData}>{address.default ? 'Yes' : 'No'}</td>
              <td className={styles.tableData}>{address.shipping ? 'Ship' : 'Bill'}</td>
              <td className={styles.tableData}>
                <div className={styles.tableButtons}>
                  <IconButton type="button" onClick={() => handleEditAddress(index)}>
                    {editIndex === index ? <EditOffTwoToneIcon /> : <EditTwoToneIcon />}
                  </IconButton>
                  <IconButton type="button" onClick={() => handleDeleteAddress(index)}>
                    <DeleteForeverTwoToneIcon />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddressForm editIndex={editIndex} updateEditIndex={setEditIndex} />
    </div>
  );
}

export default AddressTable;
