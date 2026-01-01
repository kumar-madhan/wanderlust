import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '@/features/auth/pages/signup-page';

export const setupSignupForm = () =>
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
