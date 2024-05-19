/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer message 1', () => {
    render(<Footer />);
    const thankYouMessage = screen.getByText(/Thank you for shopping with us!/i);
    expect(thankYouMessage).toBeInTheDocument();
  });

  test('renders footer message 2', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightMessage = screen.getByText(new RegExp(`© ${currentYear} OLD Ecommerce Shop. All rights reserved.`, 'i'));
    expect(copyrightMessage).toBeInTheDocument();
  });
});