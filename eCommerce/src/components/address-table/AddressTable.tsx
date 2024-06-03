import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { initialAddressError, useAddresses } from '../../context/AddressesContext.tsx';
import { getCountry } from '../../utils/currencies.ts';
import styles from './AddressTable.module.css';
import { RegistrationService } from '../../services/RegistrationService.ts';
import SuccessModal from '../UI/success-modal/SuccessModal.tsx';
import ModalAddAddress from '../UI/modal-add-address/ModalAddAddress.tsx';

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

function AddressTable() {
  const addressesState = useAddresses();

  const { setAddresses, addresses } = { ...addressesState };

  const [editIndex, setEditIndex] = useState(-1);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);

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
        setSuccessUpdate(true);
      }
    });

    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses({ ...addressesState, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    setAddingAddress(true);
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
                            <EditTwoToneIcon />
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
      <Button sx={{ marginTop: '30px' }} color="success" variant="outlined" onClick={handleAddAddress}>
        Add Address
      </Button>
      {(addingAddress || editIndex >= 0) && (
        <ModalAddAddress
          editIndex={editIndex}
          updateEditIndex={setEditIndex}
          setFalseAddingAddress={() => setAddingAddress(false)}
        />
      )}
      {successUpdate && (
        <SuccessModal
          title=""
          handleClose={() => {
            setSuccessUpdate(false);
          }}
        />
      )}
    </>
  );
}

export default AddressTable;
