import * as React from 'preact'

import { Chevron, Live } from '@src/modules/icons'
import { tableLogActionIds } from './TableLog.constants'

export const createTableLogActionsCreatorPerRow = ({
  onMoveUpClick,
  onMoveDownClick,
  onToggleColumn,
  activeColumnIds,
  columns
}) => {
  const firstColumn = columns.at(0)
  const lastColumn = columns.at(-1)

  return row => [
    {
      id: tableLogActionIds.MOVE_UP,
      title: 'Move up',
      onClick: onMoveUpClick,
      Component: <Chevron direction="top" />,
      disabled: row.id === lastColumn.id
    },
    {
      id: tableLogActionIds.MOVE_DOWN,
      title: 'Move down',
      onClick: onMoveDownClick,
      Component: <Chevron direction="bottom" />,
      disabled: row.id === firstColumn.id
    },
    {
      id: tableLogActionIds.STATE,
      title: 'State',
      onClick: onToggleColumn,
      Component: <Live active={activeColumnIds.includes(row.id)} />
    }
  ]
}
