/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header.tsx';
import * as utils from '../../../utils/validation.ts';
import { AuthorizationService } from '../../../services/AuthorizationService.ts';

jest.mock('../../../services/AuthorizationService.ts', () => ({
  AuthorizationService: {
    removeCustomerInfo: jest.fn(),
    getCustomerInfo: jest.fn().mockReturnValue({ id: '' }),
  },
}));
const userLogged = jest.spyOn(utils, 'isUserLoggedIn');

describe('Header Component user logout', () => {
  test('renders logo', () => {
    userLogged.mockReturnValue(false);
    const { getByAltText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders login button', () => {
    userLogged.mockReturnValue(false);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const loginButton = getByText(/Log in/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders logout button', () => {
    userLogged.mockReturnValue(true);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const loginButton = getByText(/Logout/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders register button usr not logged', () => {
    userLogged.mockReturnValue(false);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const registerButton = getByText(/Register/i);
    expect(registerButton).toBeInTheDocument();
  });

  test('renders register button user logged', () => {
    userLogged.mockReturnValue(true);
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const registerButton = getByText(/My orders/i);
    expect(registerButton).toBeInTheDocument();
  });
  // buttons handle
  test('calls removeCustomerLogin', () => {
    userLogged.mockReturnValue(true);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const authButton = screen.getByText(/Logout/i);
    fireEvent.click(authButton);

    expect(AuthorizationService.removeCustomerInfo).toHaveBeenCalled();
  });
});
