import React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandStorage } from './CommandStorage.component'

export const storageConfig = {
  props: {
    local: {
      key: 'local',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['l']
    },
    session: {
      key: 'session',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['s']
    },
    cookies: {
      key: 'cookies',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      aliases: ['c']
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
