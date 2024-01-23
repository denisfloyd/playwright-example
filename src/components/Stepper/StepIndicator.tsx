import {classNames} from '@/utils';
import {useSteps} from './context/StepContext';

export const StepIndicator = () => {
  const {activeStep, countSteps} = useSteps();

  return (
    <header className="flex items-center p-5">
      <div className="text-sm">Step {`${activeStep + 1} / ${countSteps}`}</div>
      <ul className="ml-3 flex items-center">
        {Array.from({length: countSteps}, (_, index) => (
          <li
            key={index}
            className={classNames(
              'h-4 w-4 ml-3 rounded-full',
              index <= activeStep ? 'bg-purple-600' : 'bg-gray-200',
              activeStep === index && 'border-purple-500 ripple'
            )}
          ></li>
        ))}
      </ul>
    </header>
  );
};
