type InputType = 'text' | 'password' | 'tel' | 'email';

interface IFormInput {
  id: string,
  name?: string,
  type?: InputType,
  value?: string,
  label: string,
  errors?: {
    fieldId: string,
    general?: string,
    emptyField: string,
    customValidator?: () => boolean,
    dependentFields?: [string],
  }
}
export interface IFormInputData extends IFormInput {
  name: string
}

export default IFormInput;
