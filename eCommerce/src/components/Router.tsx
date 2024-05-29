import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main/Main.tsx';
import LoginPage from '../pages/login/Login.tsx';
import RegisterPage from '../pages/registration/Registration.tsx';
import NotFound from '../pages/not_found/Notfound.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import { PagePaths } from '../utils/utils.ts';
import { AuthProvider } from '../context/AuthContext.tsx';
import { UserPersonalDataProvider } from '../context/UserPersonalDataContext.tsx';
import { AddressProvider } from '../context/AddressesContext.tsx';
import Profile from '../pages/profile/Profile.tsx';

function AppRouter() {
  return (
    <Routes>
      <Route path={PagePaths.Main} element={<MainPage />} />
      <Route
        path={PagePaths.Login}
        element={
          <PrivateRoute>
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          </PrivateRoute>
        }
      />
      <Route
        path={PagePaths.Register}
        element={
          <PrivateRoute>
            <AuthProvider>
              <UserPersonalDataProvider>
                <AddressProvider>
                  <RegisterPage />
                </AddressProvider>
              </UserPersonalDataProvider>
            </AuthProvider>
          </PrivateRoute>
        }
      />
      <Route path={PagePaths.Profile} element={<Profile />} />
      <Route path={PagePaths.NotFound} element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
