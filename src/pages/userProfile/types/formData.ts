import { InputType } from 'components/input/types';

interface IFormData {
  [key: string]: {
    label: string,
    value?: string,
    type?: InputType,
  }
}

export default IFormData;
