import React from 'react'
import { optionTypes } from '../../constants/commands.constants'
import { CommandOn } from './CommandOn.component'

export const onConfig = {
  props: {
    url: {
      key: 'url',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: ['.'],
      aliases: ['u']
    },
    run: {
      key: 'run',
      type: optionTypes.ARRAY_OF_STRINGS,
      defaultValue: [],
      aliases: ['r']
    }
  },
  output: (props) => <CommandOn key={props.id} {...props} />
}
