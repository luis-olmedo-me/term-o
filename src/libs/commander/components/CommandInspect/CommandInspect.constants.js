import * as React from 'react'
import { Home } from 'src/modules/icons/Home.icon'
import { Palette } from 'src/modules/icons/Palette.icon'
import { Pencil } from 'src/modules/icons/Pencil.icon'

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
  { id: domViewIds.MAIN, text: <Home /> },
  { id: domViewIds.ATTRIBUTES, text: <Pencil /> },
  { id: domViewIds.STYLES, text: <Palette /> }
]
