/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import { PagePaths } from '../../utils/utils.ts';

jest.mock('../../services/AuthorizationService', () => ({
  AuthorizationService: {
    getCustomerLogin: jest.fn().mockReturnValue({ id: 'mockId', token: 'mockToken' }),
    login: jest.fn().mockResolvedValue({ error: false, customer: { id: '123' }, errorDescription: '' }),
    auth: jest.fn().mockResolvedValue({ error: false, customer: { id: '123' }, errorDescription: '' }),
    getAccessToken: jest.fn().mockResolvedValue({ error: false, accessToken: 'mockedToken', errorDescription: '' }),
    updateCustomerLogin: jest.fn(),
    removeCustomerLogin: jest.fn(),
  },
}));

jest.mock('../../utils/validation.ts', () => ({
  ...jest.requireActual('../../utils/validation.ts'),
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
});
