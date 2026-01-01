import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { setupSigninForm } from './signin-utils';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: { promise: vi.fn() },
}));

describe('Signin flow', () => {
  it('submits valid credentials', async () => {
    const user = userEvent.setup();
    const form = setupSigninForm();

    await user.type(
      form.getByPlaceholderText('Email'),
      'test@gmail.com'
    );
    await user.type(
      form.getByPlaceholderText('Password'),
      'Test@1234'
    );
    await user.click(form.getByText('Sign In'));

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalled();
    });
  });
});
