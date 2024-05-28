import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import { CountryType } from '../utils/currencies.ts';

interface Address {
  country: CountryType;
  city: string;
  street: string;
  postalCode: string;
  default: boolean;
  shipping: boolean;
  billing: boolean;
}

interface AddressWithError extends Address {
  countryError: string;
  cityError: string;
  streetError: string;
  postalCodeError: string;
}

type AddressesState = {
  addresses: Address[];
  currentAddressBilling: AddressWithError;
  currentAddressShipping: AddressWithError;
};

type AddressesContextType = AddressesState & {
  setAddresses: Dispatch<SetStateAction<AddressesState>>;
};

const initialAddressError: AddressWithError = {
  country: '',
  city: '',
  street: '',
  postalCode: '',
  default: false,
  shipping: false,
  billing: false,
  countryError: '',
  cityError: '',
  streetError: '',
  postalCodeError: '',
};

const initialState: AddressesState = {
  addresses: [],
  currentAddressBilling: { ...initialAddressError, billing: true },
  currentAddressShipping: { ...initialAddressError, shipping: true },
};

const AddressContext = createContext<AddressesContextType>({
  ...initialState,
  setAddresses: () => {},
});

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addressesState, setAddresses] = useState<AddressesState>(initialState);

  const addressesMemo = useMemo(
    () => ({
      ...addressesState,
      setAddresses,
    }),
    [addressesState],
  );

  return <AddressContext.Provider value={addressesMemo}>{children}</AddressContext.Provider>;
}

export const useAddresses = () => useContext(AddressContext);
