import { ISubmitBtn, IFormInputData } from 'components/form/types';

interface IProfileFormProps {
  id: string,
  name: string,
  className: string,
  inputs: IFormInputData[],
  submitBtn: ISubmitBtn,
  readonly?: boolean,
  disabled?: boolean,
  onFormSubmit: () => void,
}

export default IProfileFormProps;
