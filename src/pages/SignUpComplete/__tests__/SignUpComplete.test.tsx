import {render, screen, fireEvent} from '@/tests/test-utils';
import SignUpComplete from '..';

const alertMock = vi.fn();

describe('SignUpComplete - (unit tests)', () => {
  beforeEach(() => {
    window.alert = alertMock;
    vi.clearAllMocks();
  });

  it('should show alert when click Get Started button', () => {
    render(<SignUpComplete />);

    fireEvent.click(screen.getByRole('button', {name: 'Get Started'}));

    expect(alertMock).toHaveBeenCalledWith('You reached the end');
  });
});
