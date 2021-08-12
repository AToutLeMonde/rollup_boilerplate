import './assets/fonts.scss'
import './assets/common.scss'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

import { config } from './config'

console.log(config)

const root = document.querySelector(`#${config.formId}`);

ReactDOM.render(<App />, root)