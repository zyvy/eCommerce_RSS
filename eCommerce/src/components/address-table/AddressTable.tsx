import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditOffTwoToneIcon from '@mui/icons-material/EditOffTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Address, initialAddressError, useAddresses } from '../../context/AddressesContext.tsx';
import { getCountry } from '../../utils/currencies.ts';
import AddressContainer from '../UI/address-container/AddressContainer.tsx';
import styles from './AddressTable.module.css';
import DividerWithText from '../UI/divider-with-text/DividerWithText.tsx';
import { RegistrationService } from '../../services/RegistrationService.ts';
import { setSuccessUpdateData } from '../../utils/utils.ts';
import SuccessModal from '../UI/success-modal/SuccessModal.tsx';

interface Column {
  id: 'country' | 'city' | 'street' | 'postalCode' | 'default' | 'type' | 'actions';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'center';
}

const columns: readonly Column[] = [
  { id: 'country', label: 'Country', minWidth: 50, maxWidth: 70 },
  { id: 'city', label: 'City', minWidth: 50, maxWidth: 170 },
  {
    id: 'street',
    label: 'Street',
    minWidth: 50,
    maxWidth: 170,
  },
  {
    id: 'postalCode',
    label: 'Postal code',
    minWidth: 30,
    maxWidth: 30,
    align: 'center',
  },
  {
    id: 'default',
    label: 'Default',
    minWidth: 30,
    maxWidth: 30,
    align: 'center',
  },
  { id: 'type', label: 'Type', minWidth: 30, maxWidth: 30, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 70, maxWidth: 70, align: 'right' },
];

type AddressFormPropsType = {
  editIndex: number;
  updateEditIndex: (index: number) => void;
};

function AddressForm({ editIndex, updateEditIndex }: AddressFormPropsType) {
  const addressesState = useAddresses();
  const { setAddresses, currentAddressBilling, addresses } = { ...addressesState };
  const [isValidAddress_, setIsValidAddress_] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);

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
    updateEditIndex(-1);

    const data = await RegistrationService.changeAddress(addresses[editIndex].id || '', {
      country: currentAddressBilling.country,
      streetName: currentAddressBilling.street,
      city: currentAddressBilling.city,
      postalCode: currentAddressBilling.postalCode,
    });
    if (!data.error) {
      setSuccessUpdateData(setSuccessUpdate);
    }
  };

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

    if (!data.error) {
      setSuccessUpdateData(setSuccessUpdate);
    }

    checkDefaultAddress(addresses);
    const id = data.customer?.addresses.at(-1)?.id || '';
    addresses.push({ ...currentAddressBilling, key: uuidv4(), id });
    setAddresses({
      ...addressesState,
      addresses: [...addresses],
      currentAddressBilling: { ...initialAddressError, billing: true },
    });
  };

  const handleChangeTypeAddress = () => {
    currentAddressBilling.billing = !currentAddressBilling.billing;
    currentAddressBilling.shipping = !currentAddressBilling.shipping;
    setAddresses({ ...addressesState, ...currentAddressBilling });
  };

  return (
    <div>
      {successUpdate && <SuccessModal />}
      <DividerWithText text={editIndex >= 0 ? 'Edit Address' : 'Add Address'} />
      <form>
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

        <div>
          <Button
            className={styles.button}
            variant="outlined"
            disabled={!isValidAddress_}
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
  const [successUpdate, setSuccessUpdate] = useState(false);

  const handleEditAddress = (index: number) => {
    if (editIndex === index) {
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
    RegistrationService.removeAddress(addresses[index].id || '', addresses[index].billing).then((res) => {
      if (!res.error) {
        setSuccessUpdateData(setSuccessUpdate);
      }
    });

    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses({ ...addressesState, addresses: updatedAddresses });
  };

  return (
    <>
      <Paper sx={{ width: '98vw', overflowX: 'auto', maxWidth: '1100px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                  {columns.map((column) => {
                    let value = null;
                    if (column.id === 'actions') {
                      value = (
                        <div className={styles.tableButtons}>
                          <IconButton type="button" onClick={() => handleEditAddress(index)}>
                            {editIndex === index ? <EditOffTwoToneIcon /> : <EditTwoToneIcon />}
                          </IconButton>
                          <IconButton type="button" onClick={() => handleDeleteAddress(index)}>
                            <DeleteForeverTwoToneIcon />
                          </IconButton>
                        </div>
                      );
                    } else if (column.id === 'type') {
                      value = row.billing ? 'Bill' : 'Ship';
                    } else if (column.id === 'country') {
                      value = getCountry(row[column.id]);
                    } else if (column.id === 'default') {
                      value = row[column.id] ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />;
                    } else {
                      value = row[column.id];
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        size="small"
                        sx={{ overflow: 'hidden', maxWidth: column.maxWidth }}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {successUpdate && <SuccessModal />}
      <AddressForm editIndex={editIndex} updateEditIndex={setEditIndex} />
    </>
  );
}

export default AddressTable;
