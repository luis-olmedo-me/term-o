import React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandTabs } from './CommandTabs.component'

export const tabsConfig = {
  props: {
    list: {
      key: 'list',
      description: 'Show all tabs open',
      type: optionTypes.BOOLEAN,
      defaultValue: '',
      alias: 'l'
    }
  },
  output: (props) => <CommandTabs key={props.id} {...props} />
}

export const tabsActionTypes = {
  SHOW_TAB_LIST: 'SHOW_TAB_LIST',
  NONE: 'NONE'
}
