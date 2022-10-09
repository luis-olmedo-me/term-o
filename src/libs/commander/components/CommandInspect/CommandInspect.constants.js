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

export const inspectViewIds = {
  MAIN: 0,
  ATTRIBUTES: 1,
  STYLES: 2
}

export const inspectViews = [
  { id: inspectViewIds.MAIN, text: '🏠' },
  { id: inspectViewIds.ATTRIBUTES, text: '✏️' },
  { id: inspectViewIds.STYLES, text: '✂️' }
]
