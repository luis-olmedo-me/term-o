import * as React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandTabs } from './CommandTabs.component'

export const tabsConfig = {
  props: {
    current: {
      key: 'current',
      description: 'Show all tabs open',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'c'
    },
    history: {
      key: 'history',
      description: 'Show past tabs',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'h'
    }
  },
  output: (props) => <CommandTabs key={props.id} {...props} />
}

export const tabsActionTypes = {
  SHOW_CURRENT_TABS: 'SHOW_CURRENT_TABS',
  SHOW_HISTORY: 'SHOW_HISTORY',
  NONE: 'NONE'
}
