type InputType = 'text' | 'password' | 'tel' | 'email';

interface IFormInput {
  id: string,
  type: InputType,
  label: string,
  errors?: {
    fieldId: string,
    general?: string,
    emptyField: string,
    customValidator?: () => boolean,
    dependentFields?: [string],
  }
}

export default IFormInput;

