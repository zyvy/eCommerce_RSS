/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../utils/utils', () => ({
  ...jest.requireActual('../../utils/utils'),
  isUserLoggedIn: jest.fn(),
}));

jest.mock('../../services/AuthorizationService.ts', () => ({
  AuthorizationService: {
    removeCustomerLogin: jest.fn(),
  },
  authenticateUser: jest.fn(() => {
    const mockClientId = 'mockClientId';
    const mockClientSecret = 'mockClientSecret';
    const token = `${mockClientId}:${mockClientSecret}`;
    const hash = Buffer.from(token).toString('base64');
    return `Basic ${hash}`;
  }),
}));

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Header Component', () => {
  let isUserLoggedIn: jest.Mock;

  beforeEach(() => {
    isUserLoggedIn = require('../../utils/utils').isUserLoggedIn;
  });

  test('renders logo', () => {
    const { getByAltText } = render(<MemoryRouter><Header /></MemoryRouter>);
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders login button', () => {
    isUserLoggedIn.mockReturnValue(false);
    const { getByText } = render(<MemoryRouter><Header /></MemoryRouter>);
    const loginButton = getByText(/Log in/i);
    expect(loginButton).toBeInTheDocument();
  });
  test('renders logout button', () => {
    isUserLoggedIn.mockReturnValue(true);
    const { getByText } = render(<MemoryRouter><Header /></MemoryRouter>);
    const loginButton = getByText(/Logout/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders register button', () => {
    isUserLoggedIn.mockReturnValue(false);
    const { getByText } = render(<MemoryRouter><Header /></MemoryRouter>);
    const registerButton = getByText(/Register/i);
    expect(registerButton).toBeInTheDocument();
  });
  test('renders register button', () => {
    isUserLoggedIn.mockReturnValue(true);
    const { getByText } = render(<MemoryRouter><Header /></MemoryRouter>);
    const registerButton = getByText(/My orders/i);
    expect(registerButton).toBeInTheDocument();
  });
});