export type ValidationItem = {
  pattern: RegExp,
  errorMessage: string
}

export type InputProps = {
  
  label: string,
  initialValue?: string,
  validations: Array<ValidationItem>
}