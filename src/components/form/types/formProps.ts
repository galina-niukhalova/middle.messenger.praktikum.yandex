import IFormInputData from './formInput';
import ISubmitBtn from './submitBtn';
import IFormLink from './formLink';

interface IFormProps {
  id: string,
  name: string,
  title?: string,
  className: string,
  inputs: IFormInputData[],
  submitBtn: ISubmitBtn,
  link?: IFormLink,
  readonly?: boolean,
  onFormSubmit: () => void;
}

export default IFormProps;
