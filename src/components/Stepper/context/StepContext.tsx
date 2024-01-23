import React, {createContext, useContext, useState} from 'react';

export enum OperationType {
  NEXT = 'next',
  PREV = 'prev',
}

interface StepContextProps {
  activeStep: number;
  countSteps: number;
  setActiveStep: (type: OperationType) => void;
}

export const StepContext = createContext<StepContextProps>({
  activeStep: 0,
  countSteps: 0,
  setActiveStep: () => {},
});

interface Props {
  children: React.ReactElement;
  countSteps: number;
}

const StepContextProvider = ({children, countSteps}: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSetActiveStep = (type: OperationType) => {
    if (type === OperationType.NEXT) {
      setActiveStep(activeStep + 1);
    } else if (type === OperationType.PREV) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <StepContext.Provider value={{activeStep, countSteps, setActiveStep: handleSetActiveStep}}>
      {children}
    </StepContext.Provider>
  );
};

export function useSteps(): StepContextProps {
  const context = useContext(StepContext);

  return context;
}

export default StepContextProvider;
