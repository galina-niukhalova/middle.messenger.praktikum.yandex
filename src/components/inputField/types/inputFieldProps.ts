import { IInputProps } from 'components/input';

interface IInputFieldProps extends IInputProps {
  ref?: string,
  label: string,
  errorMessage?: string,
  isFormInput?: boolean,
}

export default IInputFieldProps;
