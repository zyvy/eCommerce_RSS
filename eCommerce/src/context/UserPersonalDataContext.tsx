import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';

interface UserPersonalDataState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  firstNameError: boolean;
  lastNameError: boolean;
  dateOfBirthError: boolean;
}

type UserPersonalDataContextType = UserPersonalDataState & {
  setData: Dispatch<SetStateAction<UserPersonalDataState>>;
};

const initialState: UserPersonalDataState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  firstNameError: false,
  lastNameError: false,
  dateOfBirthError: false,
};

const UserPersonalDataContext = createContext<UserPersonalDataContextType>({
  ...initialState,
  setData: () => {},
});

export function UserPersonalDataProvider({ children }: { children: ReactNode }) {
  const [userPersonalData, setData] = useState<UserPersonalDataState>(initialState);

  const userPersonalDataMemo = useMemo(
    () => ({
      ...userPersonalData,
      setData,
    }),
    [userPersonalData],
  );

  return <UserPersonalDataContext.Provider value={userPersonalDataMemo}>{children}</UserPersonalDataContext.Provider>;
}

export const useUserPersonalData = () => useContext(UserPersonalDataContext);
