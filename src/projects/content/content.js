import * as React from 'preact'

import { OverlayProvider } from 'modules/components/Overlay/Overlay.provider'
import { PortalProvider } from 'modules/components/Portal/Portal.provider'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { appContainer, shadow } from './content.constants'
import { FontFamilies } from './fonts/Fonts.styles'
import { Console } from './modules/Console/Console.component'

React.render(
  <>
    <FontFamilies />

    <StyleSheetManager target={shadow}>
      <ThemeProvider theme={{}}>
        <PortalProvider>
          <OverlayProvider>
            <Console />
          </OverlayProvider>
        </PortalProvider>
      </ThemeProvider>
    </StyleSheetManager>
  </>,
  shadow
)
