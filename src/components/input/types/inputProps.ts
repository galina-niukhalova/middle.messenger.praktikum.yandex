import InputType from './inputType';

interface IInputProps {
  id?: string,
  className?: string,
  type?: InputType,
  value?: string,
  name?: string,
  placeholder?: string,
  readonly?: boolean,
  onBlur?: (e: Event) => void,
  onFocus?: (e: Event) => void,
  onChange?: (e: Event) => void,
  accept?: string,
}

export default IInputProps;
