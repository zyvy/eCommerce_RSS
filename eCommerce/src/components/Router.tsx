/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main/Main.tsx';
import LoginPage from '../pages/login/Login.tsx';
import RegisterPage from '../pages/registration/Registration.tsx';
import NotFound from '../pages/not_found/Notfound.tsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
