import * as React from 'preact'

import { Chevron, Live } from '@src/modules/icons'
import { tableLogActionIds } from './TableLog.constants'

export const createTableLogActions = ({ onMoveUpClick, onMoveDownClick, columns }) => {
  const firstColumn = columns.at(0)
  const lastColumn = columns.at(-1)

  return [
    {
      id: tableLogActionIds.MOVE_UP,
      title: 'Move up',
      onClick: onMoveUpClick,
      Component: <Chevron direction="top" />,
      checkIsDisable: ({ row }) => row.id === lastColumn.id
    },
    {
      id: tableLogActionIds.MOVE_DOWN,
      title: 'Move down',
      onClick: onMoveDownClick,
      Component: <Chevron direction="bottom" />,
      checkIsDisable: ({ row }) => row.id === firstColumn.id
    },
    {
      id: tableLogActionIds.STATE,
      title: 'State',
      onClick: () => {},
      Component: <Live />
    }
  ]
}
