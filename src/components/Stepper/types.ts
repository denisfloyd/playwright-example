export enum ButtonType {
  BACK = 'back',
  CONTINUE = 'continue',
  CONFIRM = 'confirm',
}

export type ButtonsOptions = {
  [key in ButtonType]?: {
    label?: string;
    onClick?: () => void | Promise<void>;
    disabled?: boolean;
    isPending?: boolean;
  };
};
