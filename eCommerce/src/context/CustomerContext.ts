import { Dispatch, SetStateAction, createContext } from 'react';

export type CustomerContextType = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  setData: Dispatch<SetStateAction<Omit<CustomerContextType, 'setData'>>>;
};

const CustomerContext = createContext<CustomerContextType>({
  email: '',
  password: '',
  emailError: false,
  passwordError: false,
  setData: () => {},
});

export default CustomerContext;
