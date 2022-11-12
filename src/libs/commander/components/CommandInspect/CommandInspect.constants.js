import * as React from 'preact'
import { Home, Palette, Tag } from 'src/modules/icons'

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
  { id: inspectViewIds.MAIN, text: <Home /> },
  { id: inspectViewIds.ATTRIBUTES, text: <Tag /> },
  { id: inspectViewIds.STYLES, text: <Palette /> }
]
