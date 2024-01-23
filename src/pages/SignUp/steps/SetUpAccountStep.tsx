import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import Stepper, {ButtonType} from '@/components/Stepper';
import {Input, PasswordInput} from '@/components/Input';
import {User} from '../types';
import {signup} from '@/api/api-sdk';
import {useSetRecoilState} from 'recoil';
import {signUpAtom} from '../recoil/signUpAtoms';

export const SetUpAccountStep = () => {
  const {
    register,
    handleSubmit,
    formState: {isValid},
  } = useForm<User>();

  const setSignUpUserData = useSetRecoilState(signUpAtom);

  const {isPending, mutateAsync: handleSignUpUser} = useMutation({
    mutationFn: async (user: User) => {
      const token = await signup(user);
      setSignUpUserData({user, token});
      return token;
    },
  });

  return (
    <Stepper.Step
      title={"Let's set up your account"}
      buttons={{
        [ButtonType.CONTINUE]: {
          onClick: handleSubmit(user => handleSignUpUser(user)),
          disabled: !isValid,
          isPending,
        },
      }}
    >
      <form className="grid grid-cols-2 gap-x-10 gap-y-4 pb-4">
        <Input
          name="firstName"
          label="First Name"
          register={register}
          rules={{required: true}}
          placeholder={'E.g. John'}
        />
        <Input
          name="email"
          label="Email"
          register={register}
          rules={{required: true}}
          placeholder={'E.g. john.smith@example.com'}
        />
        <Input name="lastName" label="Last Name" register={register} placeholder={'E.g. Smith'} />
        <PasswordInput
          name="password"
          label="Password"
          register={register}
          rules={{required: true}}
        />
      </form>
    </Stepper.Step>
  );
};
