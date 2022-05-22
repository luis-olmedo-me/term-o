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
    }
  },
  output: (props) => <CommandStorage key={props.id} {...props} />
}

export const storageActionTypes = {
  SHOW_LOCAL_STORAGE: 'SHOW_LOCAL_STORAGE',
  NONE: 'NONE'
}

export const storageHeaders = ['key', 'values']
