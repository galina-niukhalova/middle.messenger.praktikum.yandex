import { InputType } from 'components/input/types';

interface IProfileFormInputProps {
  type?: InputType,
  readonly?: boolean,
  value: string,
  name?: string,
  onBlur?: () => void,
  invalid?: boolean,
  className?: string,
}

export default IProfileFormInputProps;
