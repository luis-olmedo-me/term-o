import React from 'react'
import { CommandOn } from './CommandOn.component'

export const onConfig = {
  props: {
    url: {
      key: 'url',
      type: 'array',
      defaultValue: ['.'],
      aliases: ['u']
    },
    run: {
      key: 'run',
      type: 'array',
      defaultValue: [],
      aliases: ['r']
    }
  },
  output: (props) => <CommandOn key={props.id} {...props} />
}
