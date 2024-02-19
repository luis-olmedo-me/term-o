import * as React from 'preact'

import { Gear, Home } from '@src/modules/icons'

export const tableLogActionIds = {
  MOVE_UP: 'move-up',
  MOVE_DOWN: 'move-down',
  STATE: 'STATE'
}

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
      actionIds: [tableLogActionIds.MOVE_UP, tableLogActionIds.MOVE_DOWN, tableLogActionIds.STATE]
    }
  ]
}
