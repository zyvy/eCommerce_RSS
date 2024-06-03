import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main/Main.tsx';
import LoginPage from '../pages/login/Login.tsx';
import RegisterPage from '../pages/registration/Registration.tsx';
import NotFound from '../pages/not_found/Notfound.tsx';
import PrivateRouteForAuthUser from './PrivateRouteForAuthUser.tsx';
import PrivateRouteForNotAuthUser from './PrivateRouteForNotAuthUser.tsx';
import { PagePaths } from '../utils/utils.ts';
import { AuthProvider } from '../context/AuthContext.tsx';
import { UserPersonalDataProvider } from '../context/UserPersonalDataContext.tsx';
import { AddressProvider } from '../context/AddressesContext.tsx';
import ProfilePage from '../pages/profile/Profile.tsx';
import ItemCard from '../pages/ItemCard/ItemCard.tsx';

function AppRouter() {
  return (
    <Routes>
      <Route path={PagePaths.Main} element={<MainPage />} />
      <Route
        path={PagePaths.Login}
        element={
          <PrivateRouteForAuthUser>
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          </PrivateRouteForAuthUser>
        }
      />
      <Route
        path={PagePaths.Register}
        element={
          <PrivateRouteForAuthUser>
            <AuthProvider>
              <UserPersonalDataProvider>
                <AddressProvider>
                  <RegisterPage />
                </AddressProvider>
              </UserPersonalDataProvider>
            </AuthProvider>
          </PrivateRouteForAuthUser>
        }
      />
      <Route
        path={PagePaths.Profile}
        element={
          <PrivateRouteForNotAuthUser>
            <AuthProvider>
              <UserPersonalDataProvider>
                <AddressProvider>
                  <ProfilePage />
                </AddressProvider>
              </UserPersonalDataProvider>
            </AuthProvider>
          </PrivateRouteForNotAuthUser>
        }
      />
      <Route path="/product/:slug" element={<ItemCard />} />
      <Route path={PagePaths.NotFound} element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
