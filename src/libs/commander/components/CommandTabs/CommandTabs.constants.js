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
    past: {
      key: 'past',
      description: 'Show past tabs',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'p'
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
    incognito: {
      key: 'incognito',
      description: 'Get tabs open in incognito mode',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'i'
    },
    here: {
      key: 'here',
      description: 'Get open tabs in the current window',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'h'
    },
    open: {
      key: 'open',
      description: 'Go to a specific url (URL)',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 'o'
    },
    delete: {
      key: 'delete',
      description: 'Delete open tab',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      alias: 'd'
    }
  },
  output: (props) => <CommandTabs key={props.id} {...props} />
}

export const tabsActionTypes = {
  SHOW_CURRENT_TABS: 'SHOW_CURRENT_TABS',
  SHOW_HISTORY: 'SHOW_HISTORY',
  REDIRECT: 'REDIRECT',
  KILL_TAB: 'KILL_TAB',
  NONE: 'NONE'
}

export const tabsHeaderIds = {
  ID: 'id',
  DATE: 'date',
  TITLE: 'title',
  HOSTNAME: 'hostname'
}
export const tabsTableOptions = {
  columns: [
    {
      id: tabsHeaderIds.ID,
      displayName: 'ID',
      width: 5,
      minTableWidth: 900
    },
    {
      id: tabsHeaderIds.DATE,
      displayName: 'Date',
      width: 25,
      minTableWidth: 0
    },
    {
      id: tabsHeaderIds.TITLE,
      displayName: 'Title',
      width: 40,
      minTableWidth: 0
    },
    {
      id: tabsHeaderIds.HOSTNAME,
      displayName: 'Host Name',
      width: 15,
      minTableWidth: 665
    }
  ]
}
