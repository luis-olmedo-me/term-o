import { useEffect, useState } from 'preact/hooks'

import { fetchTableConfig, setTableConfig } from '@src/helpers/event.helpers'
import { createTableLogActionsCreatorPerRow } from './useTableConfig.helpers'

export const useTableConfig = ({ options, id }) => {
  const defaultColumnIds = options.columns.map(column => column.id)

  const [columns, setColumns] = useState(options.columns)
  const [activeColumnIds, setActiveColumnIds] = useState(defaultColumnIds)

  useEffect(
    function receiveTableConfig() {
      if (!id) return

      const receiveConfiguration = data => {
        console.log('data', data)
        const newActiveColumnIds = data.activeColumnIds
        const hasNewActiveColumnIds = newActiveColumnIds.length > 0

        if (hasNewActiveColumnIds) setActiveColumnIds(newActiveColumnIds)
      }

      fetchTableConfig(id).then(receiveConfiguration)
    },
    [id]
  )

  const handleMoveColumnDown = ({ row: column }) => {
    const columnsCopy = [...columns]

    const columnIndex = columnsCopy.findIndex(columnCopy => columnCopy.id === column.id)
    const nextColumnIndex = columnIndex - 1

    const nextColumn = columnsCopy[nextColumnIndex]

    columnsCopy[columnIndex] = nextColumn
    columnsCopy[nextColumnIndex] = column

    setColumns(columnsCopy)
    if (id) setTableConfig(id, { activeColumnIds: columnsCopy })
  }

  const handleMoveColumnUp = ({ row: column }) => {
    const columnsCopy = [...columns]

    const columnIndex = columnsCopy.findIndex(columnCopy => columnCopy.id === column.id)
    const previousColumnIndex = columnIndex + 1

    const previousColumn = columnsCopy[previousColumnIndex]

    columnsCopy[columnIndex] = previousColumn
    columnsCopy[previousColumnIndex] = column

    setColumns(columnsCopy)
    if (id) setTableConfig(id, { activeColumnIds: columnsCopy })
  }

  const handleToggleColumn = ({ row: column }) => {
    const isActive = activeColumnIds.includes(column.id)
    const newActiveColumnIds = isActive
      ? activeColumnIds.filter(activeColumnId => activeColumnId !== column.id)
      : activeColumnIds.concat(column.id)

    setActiveColumnIds(newActiveColumnIds)
    if (id) setTableConfig(id, { activeColumnIds: newActiveColumnIds })
  }

  const createActionsPerRow = createTableLogActionsCreatorPerRow({
    onMoveUpClick: handleMoveColumnUp,
    onMoveDownClick: handleMoveColumnDown,
    onToggleColumn: handleToggleColumn,
    columns,
    activeColumnIds
  })

  const filteredColumns = columns.filter(column => activeColumnIds.includes(column.id))

  return { columns, filteredColumns, createActionsPerRow }
}
