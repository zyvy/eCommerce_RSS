import { Alert, AlertTitle } from '@mui/material';

function SuccessUpdate() {
  return (
    <Alert sx={{ display: 'flex', justifyContent: 'center' }} severity="success">
      <AlertTitle>Success</AlertTitle>
      Data was update successfully!
    </Alert>
  );
}

export default SuccessUpdate;
