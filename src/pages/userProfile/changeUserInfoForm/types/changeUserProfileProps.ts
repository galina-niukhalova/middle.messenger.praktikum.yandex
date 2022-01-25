import { IFormInput, ISubmitBtn } from 'components/form/types';

interface IChangeUserProfileProps {
  data: {
    id: string,
    inputs: Record<string, IFormInput>,
    submitBtn: ISubmitBtn,
  },
  disabled: boolean,
  readonly: boolean
}

export default IChangeUserProfileProps;
