import * as React from 'react'
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
  output: (props) => <CommandStorage key={props.id} {...props} />
}

export const storageActionTypes = {
  SHOW_LOCAL_STORAGE: 'SHOW_LOCAL_STORAGE',
  SHOW_SESSION_STORAGE: 'SHOW_SESSION_STORAGE',
  SHOW_COOKIES: 'SHOW_COOKIES',
  NONE: 'NONE'
}

export const storageHeaders = ['key', 'values']
