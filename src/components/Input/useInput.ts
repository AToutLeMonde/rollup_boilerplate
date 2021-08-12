import React from 'react'
import { InputProps } from './InputTypes'




export const useInput = (props:InputProps) => {

  const { validations, initialValue} = props
  
  const [value, setValue] = React.useState(initialValue || '')
  const [errorMessage, setErrorMessage] = React.useState('')

  const onChange = (event: { target: HTMLInputElement; }) => {
    setValue(event.target.value)
  }

  const onBlur = () => {
    validateField();
  }

  const validateField = (customValue?:string):boolean => {
    const valueForValidation = (customValue === undefined ? value : customValue)

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];

      if (!validation.pattern.test(valueForValidation)) {
        setErrorMessage(validation.errorMessage)
        return false;
      }
    }

    setErrorMessage('')
    return true;
  }

  return  {
    value,
    errorMessage,
    onBlur,
    onChange
  }
}