export type InputType = 'login' | 'password' | 'firstName' | 'secondName' | 'email'

interface IFormInput {
  errors: {
    dependentFields?: [string],
  }
}

export interface IFormInputData extends IFormInput {
  name: InputType,
}

export default IFormInput;
