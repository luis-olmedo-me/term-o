import * as React from 'preact'

import { Gear, Home } from '@src/modules/icons'
import { tableConfigActionIds } from '../../hooks/useTableConfig/useTableConfig.constants'

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
      actionIds: [
        tableConfigActionIds.MOVE_UP,
        tableConfigActionIds.MOVE_DOWN,
        tableConfigActionIds.STATE
      ]
    }
  ]
}
