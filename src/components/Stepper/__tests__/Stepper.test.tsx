import {Children, ComponentProps} from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import StepContextProvider from '../context/StepContext';

import StepperBase from '../Stepper';
import {Step} from '../Step';
import {ButtonType} from '../types';

const Stepper = ({children, ...rest}: ComponentProps<typeof StepperBase>) => {
  return (
    <StepContextProvider countSteps={Children.count(children)}>
      <StepperBase {...rest}>{children}</StepperBase>
    </StepContextProvider>
  );
};

describe('Stepper - (unit tests)', () => {
  it('should render correctly the number of steps', () => {
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    expect(screen.getByText(/Step 1 \/ 2/i)).toBeInTheDocument();
  });

  it('should render correctly the current step page', () => {
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
  });

  it('should go the next stepper page when clicking on Continue button', async () => {
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

    expect(await screen.findByText('Step 2')).toBeInTheDocument();
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  it('should go back to the previous page when clicking on Back button', async () => {
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
    fireEvent.click(await screen.findByRole('button', {name: 'Back'}));

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
  });

  it('should not show back button on the first page', async () => {
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    expect(await screen.findByRole('button', {name: 'Continue'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Back'})).not.toBeInTheDocument();
  });

  it('should show Confirm button instead of Continue on last page', async () => {
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

    expect(await screen.findByRole('button', {name: 'Confirm'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Continue'})).not.toBeInTheDocument();
  });

  it('should call callback function when clicks to Continue button', async () => {
    const onClickSpy = vi.fn();
    render(
      <Stepper>
        <Step
          buttons={{
            [ButtonType.CONTINUE]: {
              onClick: onClickSpy,
            },
          }}
        >
          Step 1
        </Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

    await waitFor(() => {
      expect(onClickSpy).toHaveBeenCalled();
    });
  });

  it('should call callback function when clicks to Confirm button', async () => {
    const onClickSpy = vi.fn();
    render(
      <Stepper>
        <Step
          buttons={{
            [ButtonType.CONFIRM]: {
              onClick: onClickSpy,
            },
          }}
        >
          Step 1
        </Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Confirm'}));

    await waitFor(() => {
      expect(onClickSpy).toHaveBeenCalled();
    });
  });

  it('should call callback function when clicks to go back button', async () => {
    const onClickSpy = vi.fn();
    render(
      <Stepper>
        <Step>Step 1</Step>
        <Step
          buttons={{
            [ButtonType.BACK]: {
              onClick: onClickSpy,
            },
          }}
        >
          Step 2
        </Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));
    fireEvent.click(await screen.findByRole('button', {name: 'Back'}));

    await waitFor(() => {
      expect(onClickSpy).toHaveBeenCalled();
    });
  });

  it('should not go to any direction in case callback function throws an error', async () => {
    const onClickSpy = vi.fn().mockRejectedValue(new Error('Error'));
    render(
      <Stepper>
        <Step
          buttons={{
            [ButtonType.CONTINUE]: {
              onClick: onClickSpy,
            },
          }}
        >
          Step 1
        </Step>
        <Step>Step 2</Step>
      </Stepper>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Continue'}));

    await waitFor(() => {
      expect(onClickSpy).toHaveBeenCalled();
    });
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
  });
});
