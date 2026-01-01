import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '@/features/blog/pages/home-page';

describe('Home page', () => {
  it('renders blog feed', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Journey Beyond Horizons/i)
    ).toBeInTheDocument();
  });
});
