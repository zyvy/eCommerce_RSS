import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main/Main';
import LoginPage from '../pages/login/Login';
import RegisterPage from '../pages/registration/Registration';
import NotFound from '../pages/not_found/Notfound';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
