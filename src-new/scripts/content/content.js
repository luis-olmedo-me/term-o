import React from 'react'
import ReactDOM from 'react-dom'

import { appRoot, shadowRoot } from '$/content.constants'
import { FontFamilies } from '$/fonts/Fonts.styles'

document.body.prepend(appRoot)

const ExtensionApp = () => {
  console.log('Hello World from popup.js inside the ExtensionApp!')

  return <p>Hi</p>
}

ReactDOM.render(
  <React.StrictMode>
    <FontFamilies />

    <shadowRoot.div>
      <ExtensionApp />
    </shadowRoot.div>
  </React.StrictMode>,
  appRoot
)
