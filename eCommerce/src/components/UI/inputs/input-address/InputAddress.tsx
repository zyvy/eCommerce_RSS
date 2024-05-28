/* eslint-disable react/require-default-props */
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useAddresses } from '../../../../context/AddressesContext.tsx';
import { AddressType } from '../../../../utils/utils.ts';
import { CountryType, CurrencyType } from '../../../../utils/currencies.ts';

type PropsType = {
  typeAddress: AddressType;
  isHandleOnInput?: boolean;
  isHandleOnChange?: boolean;
  fieldName: 'country' | 'city' | 'street';
  errorFieldName: 'countryError' | 'cityError' | 'streetError';
  errorText: string;
  label: string;
  validation: (value: string) => boolean;
  currencies?: CurrencyType[];
};

function InputAddress({
  typeAddress,
  isHandleOnInput = true,
  isHandleOnChange = false,
  fieldName,
  errorFieldName,
  errorText,
  label,
  currencies = [],
  validation,
}: PropsType) {
  const { addresses, currentAddressBilling, currentAddressShipping, setAddresses } = useAddresses();
  const addresseState = typeAddress === 'billing' ? currentAddressBilling : currentAddressShipping;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldName === 'country') {
      const code = e.target.value as CountryType;
      addresseState[fieldName] = code;
      addresseState[errorFieldName] = code && !validation(code) ? errorText : '';
    } else {
      const { value } = e.target;
      addresseState[fieldName] = value;
      addresseState[errorFieldName] = value && !validation(value) ? errorText : '';
    }
    setAddresses({
      addresses,
      currentAddressBilling,
      currentAddressShipping,
    });
  };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isHandleOnInput) {
      handleInput(e);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isHandleOnChange) {
      handleInput(e);
    }
  };

  return (
    <TextField
      error={!!addresseState[errorFieldName]}
      helperText={addresseState[errorFieldName]}
      value={addresseState[fieldName]}
      size="small"
      required
      sx={{ width: '100%' }}
      label={label}
      variant="outlined"
      type="text"
      onInput={handleOnInput}
      onChange={handleOnChange}
      select={currencies && !!currencies.length}>
      {currencies
        ?.filter((option) => !!option.value)
        ?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
}

export default InputAddress;
