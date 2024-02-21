import { useState } from 'preact/hooks'
import { createTableLogActionsCreatorPerRow } from './useTableConfig.helpers'

export const useTableConfig = ({ options }) => {
  const [columns, setColumns] = useState(options.columns)

  const defaultColumnIds = options.columns.map(column => column.id)
  const [activeColumnIds, setActiveColumnIds] = useState(defaultColumnIds)

  const handleMoveColumnDown = ({ row: column }) => {
    const columnsCopy = [...columns]

    const columnIndex = columnsCopy.findIndex(columnCopy => columnCopy.id === column.id)
    const nextColumnIndex = columnIndex - 1

    const nextColumn = columnsCopy[nextColumnIndex]

    columnsCopy[columnIndex] = nextColumn
    columnsCopy[nextColumnIndex] = column

    setColumns(columnsCopy)
  }

  const handleMoveColumnUp = ({ row: column }) => {
    const columnsCopy = [...columns]

    const columnIndex = columnsCopy.findIndex(columnCopy => columnCopy.id === column.id)
    const previousColumnIndex = columnIndex + 1

    const previousColumn = columnsCopy[previousColumnIndex]

    columnsCopy[columnIndex] = previousColumn
    columnsCopy[previousColumnIndex] = column

    setColumns(columnsCopy)
  }

  const handleToggleColumn = ({ row: column }) => {
    const isActive = activeColumnIds.includes(column.id)

    setActiveColumnIds(oldActiveColumnsIds => {
      return isActive
        ? oldActiveColumnsIds.filter(activeColumnId => activeColumnId !== column.id)
        : oldActiveColumnsIds.concat(column.id)
    })
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
