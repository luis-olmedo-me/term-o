import * as React from 'preact'

import { FontFamilies } from './fonts/Fonts.styles'

const appRoot = document.createElement('div')
document.body.prepend(appRoot)

const ExtensionApp = () => {
  console.log('Hello World from popup.js inside the ExtensionApp!')

  return <p>Hi</p>
}

React.render(
  <>
    <FontFamilies />

    <ExtensionApp />
  </>,
  appRoot
)
