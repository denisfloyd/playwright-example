import {StepFooter} from './StepFooter';
import {ButtonsOptions} from './types';

interface Props {
  title?: string;
  children?: React.ReactNode;
  buttons?: ButtonsOptions;
}

export const Step = ({title, buttons, children}: Props) => {
  return (
    <li>
      <div className="mb-5 px-5">
        {title && (
          <h2 className="mb-8 text-2xl">
            <strong>{title}</strong>
          </h2>
        )}
        {children}
      </div>
      <StepFooter buttons={buttons} />
    </li>
  );
};
