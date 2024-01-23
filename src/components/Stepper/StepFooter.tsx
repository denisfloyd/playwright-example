import {Button} from '../Button';
import {OperationType, useSteps} from './context/StepContext';
import {ButtonType, ButtonsOptions} from './types';

interface Props {
  buttons?: ButtonsOptions;
}

export const StepFooter = ({buttons = {}}: Props) => {
  const {activeStep, countSteps, setActiveStep} = useSteps();

  const onHandleClick = async (buttonType: ButtonType, successCallback?: () => void) => {
    try {
      const buttonTypeClick = buttons[buttonType]?.onClick;
      buttonTypeClick && (await buttonTypeClick());
      successCallback && successCallback();
      // eslint-disable-next-line no-empty
    } catch (error: unknown) {}
  };

  return (
    <footer className="mt-2 flex justify-between border-t-[1px] border-gray-200 px-5 py-8">
      {activeStep > 0 && (
        <Button
          buttonStyle="subtle"
          onClick={() => {
            onHandleClick(ButtonType.BACK, () => setActiveStep(OperationType.PREV));
          }}
          disabled={buttons[ButtonType.BACK]?.disabled}
        >
          {buttons[ButtonType.BACK]?.label || 'Back'}
        </Button>
      )}
      {activeStep < countSteps - 1 ? (
        <Button
          className="ml-auto"
          onClick={() =>
            onHandleClick(ButtonType.CONTINUE, () => setActiveStep(OperationType.NEXT))
          }
          disabled={buttons[ButtonType.CONTINUE]?.disabled}
          isPending={buttons[ButtonType.CONTINUE]?.isPending}
        >
          {buttons[ButtonType.CONTINUE]?.label || 'Continue'}
        </Button>
      ) : (
        <Button
          className="ml-auto"
          onClick={() => onHandleClick(ButtonType.CONFIRM)}
          disabled={buttons[ButtonType.CONFIRM]?.disabled}
          isPending={buttons[ButtonType.CONFIRM]?.isPending}
        >
          {buttons[ButtonType.CONFIRM]?.label || 'Confirm'}
        </Button>
      )}
    </footer>
  );
};
