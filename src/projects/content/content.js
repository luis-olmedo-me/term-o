import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Console } from './modules/Console/Console.component'
import { FontFamilies } from './fonts/Fonts.styles'
import { appRoot, shadowRoot } from './content.constants'
import { PortalProvider } from 'modules/components/Portal/Portal.provider'
import { OverlayProvider } from 'modules/components/Overlay/Overlay.provider'
import { ToggleControls } from './content.styles'

document.body.prepend(appRoot)

const root = createRoot(appRoot)

root.render(
  <>
    <FontFamilies />
    <ToggleControls />

    <shadowRoot.div>
      <PortalProvider>
        <OverlayProvider>
          <Console />
        </OverlayProvider>
      </PortalProvider>
    </shadowRoot.div>
  </>
)
