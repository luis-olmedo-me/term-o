import React from 'react'
import ReactDOM from 'react-dom'

import { Console } from './modules/Console/Console.component'
import { FontFamilies } from './fonts/Fonts.styles'
import { appRoot, shadowRoot } from './content.constants'
import { PortalProvider } from '../../modules/components/Portal/Portal.provider'

document.body.prepend(appRoot)

ReactDOM.render(
  <React.StrictMode>
    <FontFamilies />

    <shadowRoot.div>
      <PortalProvider>
        <Console />
      </PortalProvider>
    </shadowRoot.div>
  </React.StrictMode>,
  appRoot
)
