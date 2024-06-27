/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration.tsx';
import '@testing-library/jest-dom';
import { AuthorizationService } from '../../services/AuthorizationService.ts';

jest.mock('../../services/RegistrationService.ts');
jest.mock('../../services/AuthorizationService.ts');
jest.mock('../../services/ctpClient.ts');
AuthorizationService.getCustomerInfo = jest.fn().mockReturnValue({ id: '' });

describe('Registration Page', () => {
  test('renders Registration component correctly', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/)).toBeInTheDocument();
    expect(screen.getByText(/Billing address/)).toBeInTheDocument();
    expect(screen.getByText(/Shipping address/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/ })).toBeInTheDocument();
    const regButtons = screen.getAllByRole('button', { name: /Register/ });
    expect(regButtons).toHaveLength(2);
  });
});
