import {ComponentProps, useState} from 'react';
import {Input} from './Input';
import {FieldValues} from 'react-hook-form';
import {BiShow, BiHide} from 'react-icons/bi';

type Props<T extends FieldValues> = Omit<ComponentProps<typeof Input<T>>, 'type'>;

export const PasswordInput = <T extends FieldValues>(props: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <button
        data-testid="toggle-password"
        onClick={e => {
          e.stopPropagation();
          toggleShowPassword();
        }}
        type="button"
        className="absolute bottom-[12px] right-2 cursor-pointer text-gray-400"
      >
        {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
      </button>
    </div>
  );
};
