import React from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
  label: string;
  errorText: string;
  handleOnInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputText({ label, errorText, handleOnInput }: PropsType) {
  return (
    <TextField
      error={!!errorText}
      helperText={errorText}
      size="small"
      required
      sx={{ width: '100%' }}
      label={label}
      variant="outlined"
      type="text"
      onInput={handleOnInput}
    />
  );
}

export default InputText;
