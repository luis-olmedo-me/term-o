import React from 'react'
import { render } from 'react-dom'

import { Console } from './modules/Console/Console.component'
import { FontFamilies } from './fonts/Fonts.styles'
import { appRoot, shadowRoot } from './content.constants'
import { PortalProvider } from 'modules/components/Portal/Portal.provider'
import { OverlayProvider } from 'modules/components/Overlay/Overlay.provider'

setTimeout(() => {
  document.body.prepend(appRoot)

  render(
    <React.StrictMode>
      <FontFamilies />

      <shadowRoot.div>
        <PortalProvider>
          <OverlayProvider>
            <Console />
          </OverlayProvider>
        </PortalProvider>
      </shadowRoot.div>
    </React.StrictMode>,
    appRoot
  )
}, 1000)
