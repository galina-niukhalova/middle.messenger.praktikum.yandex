import { InputType } from 'components/input/types';

type InputVariants = 'login';

export interface IFormInputData {
  name: InputVariants,
  type: InputType,
  label: string,
  value: string,
  invalid: boolean,
  errors?: {
    dependentField: string,
  }
}
