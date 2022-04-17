import { InputType } from 'components/input/types';

interface IProfileFormInputProps {
  type?: InputType,
  readonly?: boolean,
  value: string,
  name?: string,
  onBlur?: () => void,
}

export default IProfileFormInputProps;
