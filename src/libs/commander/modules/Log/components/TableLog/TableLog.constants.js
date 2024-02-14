import * as React from 'preact'

import { Gear, Home } from '@src/modules/icons'

export const tableLogViewIds = {
  TABLE: 0,
  CONFIG: 1
}

export const tableLogViews = [
  { id: tableLogViewIds.TABLE, text: <Home /> },
  { id: tableLogViewIds.CONFIG, text: <Gear /> }
]
