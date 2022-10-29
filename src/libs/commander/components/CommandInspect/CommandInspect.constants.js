import * as React from 'react'
import { Home } from 'src/modules/icons/Home.icon'
import { Palette } from 'src/modules/icons/Palette.icon'
import { Tag } from 'src/modules/icons/Tag.icon'

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
