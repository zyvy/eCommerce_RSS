import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';

type UserPersonalDataType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  firstNameError: boolean;
  lastNameError: boolean;
  dateOfBirthError: boolean;
  setData: Dispatch<SetStateAction<Omit<UserPersonalDataType, 'setData'>>>;
};

const UserPersonalDataContext = createContext<UserPersonalDataType>({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  firstNameError: false,
  lastNameError: false,
  dateOfBirthError: false,
  setData: () => {},
});

export function UserPersonalDataProvider({ children }: { children: ReactNode }) {
  const [userPersonalData, setData] = useState<Omit<UserPersonalDataType, 'setData'>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    firstNameError: false,
    lastNameError: false,
    dateOfBirthError: false,
  });

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
