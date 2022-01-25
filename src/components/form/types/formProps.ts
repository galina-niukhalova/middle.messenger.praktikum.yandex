import IFormInputData from './formInput';
import ISubmitBtn from './submitBtn';
import IFormLink from './formLink';

interface IFormProps {
  data: {
    formID: string,
    title: string,
    formClassName: string,
    inputs: IFormInputData,
    submitBtn: ISubmitBtn,
    formLink: IFormLink,
  }
}

export default IFormProps;
