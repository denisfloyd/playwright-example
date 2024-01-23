import {render, screen, waitFor, fireEvent} from '@/tests/test-utils';
import SignUp from '..';
import * as API from '@/api/api-sdk';

const navigateSpy = vi.fn();

vi.mock('react-router-dom', async () => ({
  __esModule: true,
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateSpy,
}));

describe('Sign up Flow - (Integration tests)', () => {
  beforeEach(() => {
    vi.spyOn(API, 'signup').mockResolvedValue('token-123');
    vi.spyOn(API, 'completeSignup').mockResolvedValue();
    vi.clearAllMocks();
  });

  it('should render the first explanation step on start up', () => {
    render(<SignUp />);

    expect(screen.getByText('By continuing you accept our Terms of Service')).toBeInTheDocument();
  });

  it('should go the form sign up page after clicking continue from explanation page', () => {
    render(<SignUp />);

    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByText("Let's set up your account")).toBeInTheDocument();
  });

  it('should continue button be disabled in case any of required fields is empty on sign up form page', async () => {
    render(<SignUp />);

    fireEvent.click(screen.getByText('Continue'));

    const continueButton = screen.getByRole('button', {name: 'Continue'});
    await waitFor(() => {
      expect(continueButton).toBeDisabled();
    });
  });

  it('should be able to fill the sign up form page and go to the confirmation page after clicking continue', async () => {
    const signupSpy = vi.spyOn(API, 'signup').mockResolvedValue('token-123');
    render(<SignUp />);

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
    fillFormFields();
    const continueButton = screen.getByRole('button', {name: 'Continue'});
    await waitFor(() => {
      expect(continueButton).not.toBeDisabled();
    });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(signupSpy).toHaveBeenCalled();
    });
    expect(screen.getByText('Confirm your email')).toBeInTheDocument();
    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  });

  it('should be able to fill the confirmation page and go to the success page after clicking continue', async () => {
    const completeSignupSpy = vi.spyOn(API, 'completeSignup').mockResolvedValue();
    render(<SignUp />);

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
    fillFormFields();
    const continueButton = screen.getByRole('button', {name: 'Continue'});
    await waitFor(() => {
      expect(continueButton).not.toBeDisabled();
    });
    fireEvent.click(continueButton);
    await waitFor(() => {
      expect(screen.getByText('Confirm your email')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText('E.g. 123456'), {target: {value: '123456'}});
    fireEvent.click(screen.getByRole('button', {name: 'Confirm'}));

    await waitFor(() =>
      expect(navigateSpy).toHaveBeenCalledWith('/signup-complete', {replace: true})
    );
    expect(completeSignupSpy).toHaveBeenCalledWith({
      challengeToken: 'token-123',
      otp: {
        code: '123456',
      },
    });
  });

  it('should not go to the confirmation page in case some error happens while sending form data', async () => {
    const signupSpy = vi.spyOn(API, 'signup').mockRejectedValue('error');
    render(<SignUp />);

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
    fillFormFields();
    const continueButton = screen.getByRole('button', {name: 'Continue'});
    await waitFor(() => {
      expect(continueButton).not.toBeDisabled();
    });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(signupSpy).toHaveBeenCalled();
    });
    expect(screen.queryByText('Confirm your email')).not.toBeInTheDocument();
  });
});

const fillFormFields = () => {
  fireEvent.change(screen.getByLabelText('First Name'), {target: {value: 'John'}});
  fireEvent.change(screen.getByLabelText('Last Name'), {target: {value: 'Doe'}});
  fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'test@email.com'}});
  fireEvent.change(screen.getByLabelText('Password'), {target: {value: 'password'}});
};
