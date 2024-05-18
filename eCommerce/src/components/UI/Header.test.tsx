import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock the utils and services
jest.mock('../../utils/utils', () => ({
  ...jest.requireActual('../../utils/utils'),
  isUserLoggedIn: jest.fn(),
}));

jest.mock('../../services/AuthorizationService.ts', () => ({
  AuthorizationService: {
    removeCustomerLogin: jest.fn(),
  },
  // Mock authenticateUser function
  authenticateUser: jest.fn(() => {
    const mockClientId = 'mockClientId';
    const mockClientSecret = 'mockClientSecret';
    const token = `${mockClientId}:${mockClientSecret}`;
    const hash = Buffer.from(token).toString('base64');
    return `Basic ${hash}`;
  }),
}));

describe('Header Component', () => {
  let isUserLoggedIn: jest.Mock;
  test('renders logo', () => {
    // Mock the return value of isUserLoggedIn
    const { getByAltText } = render(<Header />);
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders login button', () => {
    // Set up mock for isUserLoggedIn
    isUserLoggedIn.mockReturnValue(false);
    const { getByText } = render(<Header />);
    const loginButton = getByText(/Log in/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders register button', () => {
    // Set up mock for isUserLoggedIn
    isUserLoggedIn.mockReturnValue(false);
    const { getByText } = render(<Header />);
    const registerButton = getByText(/Register/i);
    expect(registerButton).toBeInTheDocument();
  });
});