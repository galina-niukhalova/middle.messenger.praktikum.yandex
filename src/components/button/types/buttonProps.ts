import ButtonVariants from './buttonVariants';

interface IButtonProps {
  type?: 'submit',
  className?: string,
  label: string,
  id?: string,
  variant?: ButtonVariants,
  events: {
    click: () => void,
  }
}

export default IButtonProps;
