import * as React from 'react'
import { optionTypes } from '../../constants/commands.constants'

import { CommandInspect } from './CommandInspect.component'

export const inspectConfig = {
  props: {},
  output: (props) => <CommandInspect key={props.id} {...props} />
}

export const inspectActionTypes = {
  INSPECT: 'INSPECT',
  NONE: 'NONE'
}
