import ISubmitBtn from './submitBtn';
import IFormLink from './formLink';

interface IFormProps {
  id: string,
  name: string,
  title?: string,
  className: string,
  inputs: string,
  submitBtn: ISubmitBtn,
  link?: string,
  readonly?: boolean,
  onFormSubmit: () => void;
}

export default IFormProps;
