import {Children} from 'react';
import {StepIndicator} from './StepIndicator';
import StepContextProvider, {useSteps} from './context/StepContext';

interface Props {
  children: React.ReactNode;
}

const StepperContainer = ({children}: Props) => {
  const countSteps = Children.count(children);
  return (
    <StepContextProvider countSteps={countSteps}>
      <Stepper>{children}</Stepper>
    </StepContextProvider>
  );
};

const Stepper = ({children}: Props) => {
  const {activeStep} = useSteps();

  return (
    <aside className="mx-auto max-w-[95%] rounded bg-white shadow-sm sm:max-w-[50%]">
      <StepIndicator />
      <ul className="max-h-[500px] overflow-y-auto">{Children.toArray(children)[activeStep]}</ul>
    </aside>
  );
};

export default StepperContainer;
