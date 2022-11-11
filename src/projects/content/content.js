import * as React from 'preact';

import { OverlayProvider } from 'modules/components/Overlay/Overlay.provider';
import { PortalProvider } from 'modules/components/Portal/Portal.provider';
import { appRoot } from './content.constants';
import { BodyReset } from './content.styles';
import { FontFamilies } from './fonts/Fonts.styles';
import { Console } from './modules/Console/Console.component';

const termoBody = document.createElement('body');
termoBody.setAttribute('id', 'term-o-body');

document.documentElement.append(termoBody);
termoBody.append(appRoot);

React.render(
  <>
    <FontFamilies />
    <BodyReset />

    <PortalProvider>
      <OverlayProvider>
        <Console />
      </OverlayProvider>
    </PortalProvider>
  </>,
  appRoot
);
