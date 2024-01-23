import {ComponentProps} from 'react';
import {UseFormRegister, RegisterOptions, FieldValues} from 'react-hook-form';
import {classNames} from '@/utils';

type Props<T extends FieldValues> = ComponentProps<'input'> & {
  name: T[keyof T];
  label?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<FieldValues, string> | undefined;
};

export const Input = <T extends FieldValues>({
  className,
  label,
  register,
  rules = {},
  name,
  ...rest
}: Props<T>) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        id={name}
        className={classNames(
          'border-2 h-11 px-2 rounded-md border-gray-100 focus-visible:border-purple-700 outline-none',
          className
        )}
        {...(name && register ? register(name, rules) : {})}
        {...rest}
      />
    </div>
  );
};
