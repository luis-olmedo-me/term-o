import * as React from 'preact'

import { Home } from '@src/modules/icons'
import { optionTypes } from '../../constants/commands.constants'
import { CommandStorage } from './CommandStorage.component'

export const storageConfig = {
  props: {
    local: {
      key: 'local',
      description: 'Show the local storage of the current context',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'l'
    },
    session: {
      key: 'session',
      description: 'Show the session storage of the current context',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 's'
    },
    cookies: {
      key: 'cookies',
      description: 'Show the cookies of the current context',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'c'
    }
  },
  output: CommandStorage
}

export const storageActionTypes = {
  SHOW_LOCAL_STORAGE: 'SHOW_LOCAL_STORAGE',
  SHOW_SESSION_STORAGE: 'SHOW_SESSION_STORAGE',
  SHOW_COOKIES: 'SHOW_COOKIES',
  NONE: 'NONE'
}

export const storageViewIds = {
  MAIN: 0,
  EDITOR: 1
}

export const storageViews = [
  { id: storageViewIds.MAIN, text: <Home /> },
  { id: storageViewIds.EDITOR }
]

const storageHeaderIds = {
  KEY: 'key',
  VALUE: 'value'
}

export const storageTableOptions = {
  columns: [
    {
      id: storageHeaderIds.KEY,
      displayName: 'Key',
      width: '40%',
      minTableWidth: 0
    },
    {
      id: storageHeaderIds.VALUE,
      displayName: 'Value',
      width: '60%',
      minTableWidth: 0
    }
  ]
}
