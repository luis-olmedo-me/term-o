import * as React from 'preact'

import { Gear, Home } from '@src/modules/icons'
import { Chevron } from 'modules/icons'

export const tableLogActionIds = {
  MOVE_UP: 'move-up',
  MOVE_DOWN: 'move-down'
}

export const tableLogActions = [
  {
    id: tableLogActionIds.MOVE_UP,
    title: 'Move up',
    onClick: ({ value }) => console.log(value),
    Component: <Chevron direction="top" />
  },
  {
    id: tableLogActionIds.MOVE_DOWN,
    title: 'Move down',
    onClick: ({ value }) => console.log(value),
    Component: <Chevron direction="bottom" />
  }
]

export const tableLogViewIds = {
  TABLE: 0,
  CONFIG: 1
}

export const tableLogViews = [
  { id: tableLogViewIds.TABLE, text: <Home /> },
  { id: tableLogViewIds.CONFIG, text: <Gear /> }
]

const tableLogHeaderIds = {
  KEY: 'key'
}

export const tableLogTableOptions = {
  columns: [
    {
      id: tableLogHeaderIds.KEY,
      displayName: 'Column Name',
      field: 'displayName',
      actionIds: [tableLogActionIds.MOVE_UP, tableLogActionIds.MOVE_DOWN]
    }
  ]
}
