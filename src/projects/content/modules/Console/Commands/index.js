import React from 'react'

import { domGet } from './dom-get.command'
import { css } from './css.command'
import { theme } from './constants/theme.constants'
import { Dom } from './Dom/Dom.component'

const commands = {
  ...domGet,
  ...css
}

const keywords = Object.keys(commands)

export { commands, keywords, theme }

export const consoleCommands = {
  dom: {
    props: {
      get: { type: 'array', defaultValue: [] }
    },
    output: (props) => <Dom key={props.id} {...props} />
  }
}
