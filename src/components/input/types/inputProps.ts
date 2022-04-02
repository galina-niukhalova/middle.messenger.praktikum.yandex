import InputType from './inputType';

interface IInputProps {
  className?: string,
  type?: InputType,
  name?: string,
  value?: string,
  label: string,
  errorId?: string,
  isFormInput?: boolean,
  readonly?: boolean,
}

export default IInputProps;
