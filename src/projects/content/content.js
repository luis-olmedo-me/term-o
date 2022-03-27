import React from 'react'
import ReactDOM from 'react-dom'

import { Console } from './modules/Console/Console.component'
import root from 'react-shadow/styled-components'
import { FontFamilies } from './fonts/Fonts.styles'
import { rootDiv } from './content.constants'

ReactDOM.render(
  <React.StrictMode>
    <FontFamilies />

    <root.div>
      <Console />
    </root.div>
  </React.StrictMode>,
  rootDiv
)
