type InputType = 'text' | 'password' | 'tel' | 'email';

interface IFormInput {
  id: string,
  name?: string,
  type?: InputType,
  value?: string,
  label: string,
  isValid: (value: string) => boolean,
  errors?: {
    fieldId: string,
    general?: string,
    emptyField: string,
    dependentFields?: [string],
  }
}
export interface IFormInputData extends IFormInput {
  name: string
}

export default IFormInput;
