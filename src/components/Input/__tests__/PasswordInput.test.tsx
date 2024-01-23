import {render, screen, fireEvent} from '@/tests/test-utils';
import {PasswordInput} from '..';

describe('Password Input - (unit tests)', () => {
  it('should be able to show password when toggling on the eye icon', () => {
    render(<PasswordInput name="password" label="Password" />);

    fireEvent.click(screen.getByTestId('toggle-password'));

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
  });

  it('should be able to hide password when toggling off the eye icon', () => {
    render(<PasswordInput name="password" label="Password" />);

    fireEvent.click(screen.getByTestId('toggle-password'));
    fireEvent.click(screen.getByTestId('toggle-password'));

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });
});
