import { Dispatch, SetStateAction, createContext, useState, useContext, useMemo, ReactNode } from 'react';

interface AuthState {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
}

type AuthContextType = AuthState & {
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

const initialAuthState: AuthState = {
  email: '',
  password: '',
  emailError: false,
  passwordError: false,
};

const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);

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
