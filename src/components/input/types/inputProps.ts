import InputType from './inputType';

interface IInputProps {
  className: string,
  type: InputType,
  name: string,
  label: string,
  errorId: string,
  isFormInput: boolean
}

export default IInputProps;
