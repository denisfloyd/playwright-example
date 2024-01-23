import Stepper from '@/components/Stepper';
import SigmaMdLogo from '@/assets/sigmamd-logo.svg';
import {ConfirmationStep, ExplanationStep, SetUpAccountStep} from './steps';

const SignUp = () => {
  return (
    <section className="w-full pt-20">
      <img className="mx-auto mb-8 block h-8" src={SigmaMdLogo} alt="sigmamd-logo" />
      <Stepper.StepperBase>
        <ExplanationStep />
        <SetUpAccountStep />
        <ConfirmationStep />
      </Stepper.StepperBase>
    </section>
  );
};

export default SignUp;
