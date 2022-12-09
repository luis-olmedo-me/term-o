import { optionTypes } from '../../constants/commands.constants'

import { CommandCss } from './CommandCss.component'

import { validStyleKeys } from '../../commander.promises'

const cssProps = validStyleKeys.reduce((props, key) => {
  return [
    ...props,
    {
      key,
      type: optionTypes.STRING,
      defaultValue: '',
      alias: ''
    }
  ]
}, [])

export const cssConfig = {
  props: [
    {
      key: 'manualStyles',
      description: 'Apply any CSS property you want to set',
      internal: true,
      type: optionTypes.GROUP,
      groupProps: cssProps,
      defaultValue: {},
      alias: ''
    },
    {
      key: 'styles',
      description: 'Apply inline CSS',
      type: optionTypes.STRING,
      defaultValue: '',
      alias: 's'
    },
    {
      key: 'get',
      description: 'Get styles from parameter elements',
      type: optionTypes.BOOLEAN,
      defaultValue: false,
      alias: 'g'
    }
  ],
  output: CommandCss
}

export const cssActionTypes = {
  SET_STYLES: 'SET_STYLES',
  GET_STYLES: 'GET_STYLES',
  NONE: 'NONE'
}
