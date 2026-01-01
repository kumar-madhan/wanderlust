import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { setupSignupForm } from './signup-utils';

describe('Signup validation', () => {
  it('fails on empty submit', async () => {
    const user = userEvent.setup();
    const form = setupSignupForm();

    await user.click(form.getByText('Sign Up'));

    await waitFor(() => {
      expect(
        form.getByText(/required/i)
      ).toBeInTheDocument();
    });
  });
});
