/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { PagePaths } from '../../utils/utils';

jest.mock('../../services/AuthorizationService', () => ({
  AuthorizationService: {
    getCustomerLogin: jest.fn().mockReturnValue({ id: 'mockId', token: 'mockToken' }),
    login: jest.fn().mockResolvedValue({ error: false, customer: { id: '123' }, errorDescription: '' }),
    auth: jest.fn().mockResolvedValue({ error: false, customer: { id: '123' }, errorDescription: '' }),
    getAccessToken: jest.fn().mockResolvedValue({ error: false, accessToken: 'mockedToken', errorDescription: '' }),
    updateCustomerInfo: jest.fn(),
    removeCustomerInfo: jest.fn(),
  },
}));

jest.mock('../../utils/utils.ts', () => ({
  isEmailValid: jest.fn(),
  isPasswordValid: jest.fn(),
  PagePaths: {
    Main: '/',
    Register: '/register',
    Login: '/login',
  },
  isUserLoggedIn: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockImplementation(() => mockNavigate),
}));

describe('Login Component', () => {
  // const mockNavigate = jest.fn();
  // let isUserLoggedIn: jest.Mock;

  /*  beforeEach(() => {
    isUserLoggedIn = require('../../utils/utils').isUserLoggedIn;
  }); */

  test('renders login form', () => {
    render(
      <MemoryRouter initialEntries={[PagePaths.Login]}>
        <Routes>
          <Route path={PagePaths.Login} element={<Login />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle passw visibility/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create new account' })).toBeInTheDocument();
  });

  /* test('handles successful login', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const logInBtn = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123PassworD*' } });
    fireEvent.click(logInBtn);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(PagePaths.Main);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main page');
    });

    expect(AuthorizationService.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'Password' });
    expect(AuthorizationService.getAccessToken).toHaveBeenCalledWith({ email: 'test@example.com', password: '123PassworD*' });
    expect(AuthorizationService.updateCustomerLogin).toHaveBeenCalledWith('token', 'mockedToken');
    expect(mockNavigate).toHaveBeenCalledWith(PagePaths.Main);
  }); */
});
