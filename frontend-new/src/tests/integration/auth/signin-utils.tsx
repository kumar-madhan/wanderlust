import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '@/features/auth/pages/signin-page';

export const setupSigninForm = () =>
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
