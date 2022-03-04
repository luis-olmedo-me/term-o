import React from 'react'
import ReactDOM from 'react-dom'

import { Console } from './modules/Console/Console.component'
import root from 'react-shadow/styled-components'
import { FontFamilies } from './fonts/Fonts.styles'

const body = document.getElementsByTagName('body')[0]
const rootDiv = document.createElement('div')

body.prepend(rootDiv)

ReactDOM.render(
  <React.StrictMode>
    <FontFamilies />

    <root.div>
      <Console />
    </root.div>
  </React.StrictMode>,
  rootDiv
)
