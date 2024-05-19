/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import Registration from './Registration';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { RegistrationService as OldRegistrationService } from '../../services/RegistrationService';

jest.mock('../../services/RegistrationService', () => {
  RegistrationService: {
    getApiRoot: jest.fn();
  }
});

describe('Registration Page', () => {
  let RegistrationService: typeof OldRegistrationService;
  RegistrationService = require('../../services/RegistrationService');
  test('renders Registration component correctly', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/)).toBeInTheDocument();
    expect(screen.getByText(/Add billing address/)).toBeInTheDocument();
    expect(screen.getByText(/Add shipping address/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/ })).toBeInTheDocument();
  });
});
