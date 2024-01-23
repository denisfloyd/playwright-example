import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Stepper, {ButtonType} from '@/components/Stepper';
import {useRecoilValue} from 'recoil';
import {signUpAtom} from '../recoil/signUpAtoms';
import {Input} from '@/components/Input';
import {useMutation} from '@tanstack/react-query';
import {completeSignup} from '@/api/api-sdk';

export const ConfirmationStep = () => {
  const [confirmationInputValue, setConfirmationInputValue] = useState('');

  const navigate = useNavigate();
  const {user, token} = useRecoilValue(signUpAtom);

  const {isPending, mutateAsync: handleSignUpUserComplete} = useMutation({
    mutationFn: async () => {
      await completeSignup({challengeToken: String(token), otp: {code: confirmationInputValue}});
      navigate('/signup-complete', {replace: true});
    },
  });

  return (
    <Stepper.Step
      title="Confirm your email"
      buttons={{
        [ButtonType.CONFIRM]: {
          onClick: () => handleSignUpUserComplete(),
          isPending,
        },
      }}
    >
      <span className="mb-5 block">
        Please enter the one-time passcode sent to <strong>{user?.email}</strong>
      </span>

      <Input
        name="verification-code"
        data-testid="verification-code"
        placeholder="E.g. 123456"
        value={confirmationInputValue}
        onChange={e => setConfirmationInputValue(e.target?.value)}
      />
    </Stepper.Step>
  );
};
