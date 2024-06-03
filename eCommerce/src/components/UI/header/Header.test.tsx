/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { PagePaths } from '../../../utils/utils';
import { AuthorizationService as oldAuthorizationService } from '../../../services/AuthorizationService';

jest.mock('../../utils/utils', () => ({
  ...jest.requireActual('../../utils/utils'),
  isUserLoggedIn: jest.fn(),
}));

jest.mock('../../services/AuthorizationService.ts', () => ({
  AuthorizationService: {
    removeCustomerInfo: jest.fn(),
  },
  authenticateUser: jest.fn(() => {
    const mockClientId = 'mockClientId';
    const mockClientSecret = 'mockClientSecret';
    const token = `${mockClientId}:${mockClientSecret}`;
    const hash = Buffer.from(token).toString('base64');
    return `Basic ${hash}`;
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  let isUserLoggedIn: jest.Mock;
  let navigateMock: jest.Mock;
  let AuthorizationService: typeof oldAuthorizationService;

  beforeEach(() => {
    isUserLoggedIn = require('../../utils/utils').isUserLoggedIn;
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    AuthorizationService = require('../../services/AuthorizationService').AuthorizationService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  // renders
  test('renders logo', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders login button', () => {
    isUserLoggedIn.mockReturnValue(false);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const loginButton = getByText(/Log in/i);
    expect(loginButton).toBeInTheDocument();
  });
  test('renders logout button', () => {
    isUserLoggedIn.mockReturnValue(true);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const loginButton = getByText(/Logout/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders register button', () => {
    isUserLoggedIn.mockReturnValue(false);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const registerButton = getByText(/Register/i);
    expect(registerButton).toBeInTheDocument();
  });
  test('renders register button', () => {
    isUserLoggedIn.mockReturnValue(true);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const registerButton = getByText(/My orders/i);
    expect(registerButton).toBeInTheDocument();
  });
  // buttons handle
  test('calls removeCustomerInfo', () => {
    (isUserLoggedIn as jest.Mock).mockReturnValue(true);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const authButton = screen.getByText(/Logout/i);
    fireEvent.click(authButton);

    expect(AuthorizationService.removeCustomerInfo).toHaveBeenCalled();
  });

  test('navigates to login page on login', () => {
    (isUserLoggedIn as jest.Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const authButton = screen.getByText(/Log in/i);
    fireEvent.click(authButton);

    expect(navigateMock).toHaveBeenCalledWith(PagePaths.Login);
  });
});
