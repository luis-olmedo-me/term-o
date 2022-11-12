import * as React from 'preact'

import { OverlayProvider } from 'modules/components/Overlay/Overlay.provider'
import { PortalProvider } from 'modules/components/Portal/Portal.provider'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { appContainer, styleContainer } from './content.constants'
import { BodyReset } from './content.styles'
import { FontFamilies } from './fonts/Fonts.styles'
import { Console } from './modules/Console/Console.component'

React.render(
  <StyleSheetManager target={styleContainer}>
    <ThemeProvider theme={{}}>
      <FontFamilies />
      <BodyReset />

      <PortalProvider>
        <OverlayProvider>
          <Console />
        </OverlayProvider>
      </PortalProvider>
    </ThemeProvider>
  </StyleSheetManager>,
  appContainer
)
