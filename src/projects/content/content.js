import React from 'react'
import ReactDOM from 'react-dom'

import { Content } from './view/Content.view'
import root from 'react-shadow/styled-components'

const body = document.getElementsByTagName('body')[0]
const rootDiv = document.createElement('div')
rootDiv.style = `
  position: absolute;
  width: 100%;
  left: 0;
`

body.prepend(rootDiv)

ReactDOM.render(
  <React.StrictMode>
    <root.div>
      <Content />
    </root.div>
  </React.StrictMode>,
  rootDiv
)
