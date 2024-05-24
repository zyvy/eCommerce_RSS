import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';

type AuthContextType = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  setAuth: Dispatch<SetStateAction<Omit<AuthContextType, 'setAuth'>>>;
};

const AuthContext = createContext<AuthContextType>({
  email: '',
  password: '',
  emailError: false,
  passwordError: false,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Omit<AuthContextType, 'setAuth'>>({
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
  });

  const authMemo = useMemo(
    () => ({
      ...auth,
      setAuth,
    }),
    [auth],
  );

  return <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
