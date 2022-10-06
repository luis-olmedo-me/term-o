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
    },
    'by-text': {
      key: 'byText',
      description: 'Get tabs by title or url',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bt'
    },
    'by-start-date': {
      key: 'byStartDate',
      description: 'Get tabs history from start date',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bsd'
    },
    'by-end-date': {
      key: 'byEndDate',
      description: 'Get tabs history from end date',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bed'
    },
    'by-date': {
      key: 'byDate',
      description: 'Get tabs history by date',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'bd'
    },
    'max-results': {
      key: 'maxResults',
      description: 'Limit the amount of tabs shown',
      type: optionTypes.NUMBER,
      defaultValue: 500,
      alias: 'mr'
    },
    open: {
      key: 'open',
      description: 'Go to a specific url (URL)',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'o'
    },
    protocol: {
      key: 'protocol',
      description: 'Define the protocol to use for the history entry',
      type: optionTypes.STRING,
      defaultValue: 'https',
      alias: 'p'
    }
  },
  output: (props) => <CommandTabs key={props.id} {...props} />
}

export const tabsActionTypes = {
  SHOW_CURRENT_TABS: 'SHOW_CURRENT_TABS',
  SHOW_HISTORY: 'SHOW_HISTORY',
  REDIRECT: 'REDIRECT',
  NONE: 'NONE'
}
