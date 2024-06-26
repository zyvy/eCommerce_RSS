/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration.tsx';
import '@testing-library/jest-dom';

jest.mock('../../services/RegistrationService.ts');
jest.mock('../../services/AuthorizationService.ts');
jest.mock('../../services/ctpClient.ts');

describe('Registration Page', () => {
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
    expect(screen.getByRole('button', { name: /Sign in/ })).toBeInTheDocument();
    const regButtons = screen.getAllByRole('button', { name: /Register/ });
    expect(regButtons).toHaveLength(2);
  });
});
