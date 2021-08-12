import React from 'react'
import { Input, InputProps } from './../components'

import {config, getFormTagParameter} from './../config'

export const TestView = () => {

  const title = getFormTagParameter('data-title')
  
  return (
    <div>
      <h3>{title}</h3>
      <h4>{config.backendEnpoint}</h4>
      
      <form>
        <Input
        label="Тестовое поле"
        validations={[
          {
            pattern: /^.{1,50}$/,
            errorMessage: 'Поле не заполнено'
          },
          {
            pattern: /^[А-Яа-я -]{1,50}$/,
            errorMessage: 'Допустимые символы русские буквы, тире и пробелы'
          }
      ]}
          />

        </form>
    </div>
  )
}