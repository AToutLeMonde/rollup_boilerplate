
import React from 'react'
import styled from 'styled-components'
import { InputProps } from './InputTypes'
import { useInput } from './useInput'

const StyledInput = styled.input`    
    background-color: #ffffff;
`




export const Input = (props: InputProps) => {
  
  const {
    value,
    errorMessage,
    onBlur,
    onChange
  } = useInput(props)

  return (
    <>
      <div>{props.label}</div>

      <StyledInput
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      />

      {errorMessage && (<div>{errorMessage}</div>)}
    </>
    
  )
}

