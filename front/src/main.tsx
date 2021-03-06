import './styles/reset.css'
import './styles/global.css'

import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
