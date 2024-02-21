import * as React from 'preact'

import { Chevron, Live } from '@src/modules/icons'
import { tableConfigActionIds } from './useTableConfig.constants'

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
      id: tableConfigActionIds.MOVE_UP,
      title: 'Move up',
      onClick: onMoveUpClick,
      Component: <Chevron direction="top" />,
      disabled: row.id === lastColumn.id
    },
    {
      id: tableConfigActionIds.MOVE_DOWN,
      title: 'Move down',
      onClick: onMoveDownClick,
      Component: <Chevron direction="bottom" />,
      disabled: row.id === firstColumn.id
    },
    {
      id: tableConfigActionIds.STATE,
      title: 'State',
      onClick: onToggleColumn,
      Component: <Live active={activeColumnIds.includes(row.id)} />
    }
  ]
}
