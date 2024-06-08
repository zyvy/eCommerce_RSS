/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import Main from './Main';
// import { AuthorizationService as oldAuthorizationService } from '../../services/AuthorizationService';

jest.mock('../../utils/utils', () => ({
  ...jest.requireActual('../../utils/utils'),
  isUserLoggedIn: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
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

describe('Main Component', () => {
  let isUserLoggedIn: jest.Mock;
  let navigateMock: jest.Mock;
  // let AuthorizationService: typeof oldAuthorizationService;

  beforeEach(() => {
    isUserLoggedIn = require('../../utils/utils').isUserLoggedIn;
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    // AuthorizationService = require('../../services/AuthorizationService').AuthorizationService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly when user is not logged in', () => {
    (isUserLoggedIn as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main page');
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('renders correctly when user is logged in', () => {
    (isUserLoggedIn as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main page');
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText(/Orders/)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
