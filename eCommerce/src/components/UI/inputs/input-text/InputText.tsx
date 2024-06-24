import React from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
  label: string;
  errorText: string;
  value: string;
  handleOnInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputText({ label, errorText, value, handleOnInput }: PropsType) {
  return (
    <TextField
      value={value}
      error={!!errorText}
      helperText={errorText}
      size="small"
      required
      sx={{ width: '100%', maxWidth: '250px' }}
      label={label}
      variant="outlined"
      type="text"
      onInput={handleOnInput}
    />
  );
}

export default InputText;
