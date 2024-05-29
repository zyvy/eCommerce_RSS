import { Box } from '@mui/material';
import { currencies } from '../../../utils/currencies.ts';
import { AddressType } from '../../../utils/utils.ts';
import InputAddress from '../inputs/input-address/InputAddress.tsx';
import { isCityValid, isCountryValid, isStreetValid } from '../../../utils/validation.ts';
import InputPostalCode from '../inputs/input-postal-code/InputPostalCode.tsx';

type PropsType = {
  typeAddress: AddressType;
};

const STREET_ERROR_TEXT = 'Must contain at least one character';

const COUNTRY_CITY_ERROR_TEXT = 'Must contain at least one character and no special characters or numbers';

function AddressContainer({ typeAddress }: PropsType) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <InputAddress
        typeAddress={typeAddress}
        fieldName="street"
        errorFieldName="streetError"
        errorText={STREET_ERROR_TEXT}
        label="Street"
        validation={isStreetValid}
      />
      <InputAddress
        typeAddress={typeAddress}
        fieldName="city"
        errorFieldName="cityError"
        errorText={COUNTRY_CITY_ERROR_TEXT}
        label="City"
        validation={isCityValid}
      />

      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <InputAddress
          typeAddress={typeAddress}
          isHandleOnInput={false}
          isHandleOnChange
          fieldName="country"
          errorFieldName="countryError"
          errorText={COUNTRY_CITY_ERROR_TEXT}
          label="Country"
          validation={isCountryValid}
          currencies={currencies}
        />
        <InputPostalCode typeAddress={typeAddress} />
      </Box>
    </Box>
  );
}

export default AddressContainer;
