import ButtonVariants from './buttonVariants';

interface IButtonProps {
  type?: 'submit',
  className?: string,
  label: string,
  id?: string,
  variant?: ButtonVariants,
  onClick: () => void,
}

export default IButtonProps;
