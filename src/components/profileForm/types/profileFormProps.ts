import { InputType } from 'components/input/types';

type InputVariants = 'login';

export interface IFormInputData {
  name: InputVariants,
  type: InputType,
  label: string,
  value: string,
  invalid: boolean,
}
interface IProfileFormProps {
  id: string,
  name: string,
  className: string,
  inputs: string | IFormInputData[],
  readonly?: boolean,
  disabled?: boolean,
  onSubmit: () => void,
}

export default IProfileFormProps;
