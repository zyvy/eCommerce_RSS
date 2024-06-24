import React from 'react';
import TextField from '@mui/material/TextField';
import { useAddresses } from '../../../../context/AddressesContext.tsx';
import { AddressType } from '../../../../utils/utils.ts';
import { isCodeValid } from '../../../../utils/validation.ts';
import { getErrorDescription } from '../../../../utils/currencies.ts';

type PropsType = {
  typeAddress: AddressType;
};

function InputPostalCode({ typeAddress }: PropsType) {
  const { addresses, currentAddressBilling, currentAddressShipping, setAddresses } = useAddresses();
  const addresseState = typeAddress === 'billing' ? currentAddressBilling : currentAddressShipping;

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    addresseState.postalCode = value;
    addresseState.postalCodeError =
      value && !isCodeValid(addresseState.country, value) ? getErrorDescription(addresseState.country) : '';
    setAddresses({
      addresses,
      currentAddressBilling,
      currentAddressShipping,
    });
  };

  return (
    <TextField
      error={!!addresseState.postalCodeError}
      helperText={addresseState.postalCodeError}
      value={addresseState.postalCode}
      size="small"
      required
      sx={{ width: '100%' }}
      label="Postal code"
      variant="outlined"
      type="text"
      onInput={handleOnInput}
      InputLabelProps={{ shrink: !!addresseState.postalCode }}
    />
  );
}

export default InputPostalCode;
