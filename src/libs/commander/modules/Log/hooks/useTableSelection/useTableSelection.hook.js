import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { removeDuplicatedFromArray } from '@src/helpers/utils.helpers.js'
import { Skull } from '@src/modules/icons'

export const useTableSelection = ({
  onDelete,
  currentRows,
  isEnabled = true,
  tableItems,
  pages,
  changePage,
  maxItems
}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [lastRowSelected, setLastRowSelected] = useState(null)

  const handleAllSelection = () => {
    const areAllRowsIncluded = currentRows.every(allRow => selectedRows.includes(allRow))

    const selections = areAllRowsIncluded
      ? selectedRows.filter(selectedRow => !currentRows.includes(selectedRow))
      : removeDuplicatedFromArray([...selectedRows, ...currentRows])

    setSelectedRows(selections)
  }

  const handleSelectionChange = ({ row, event }) => {
    if (!event.ctrlKey && lastRowSelected) setLastRowSelected(null)
    else if (event.ctrlKey && !lastRowSelected) setLastRowSelected(row)
    else if (event.ctrlKey && lastRowSelected) {
      const startIndex = tableItems.findIndex(item => item === row)
      const endIndex = tableItems.findIndex(item => item === lastRowSelected)

      const groupSelected =
        startIndex > endIndex
          ? tableItems.slice(endIndex, startIndex + 1)
          : tableItems.slice(startIndex, endIndex + 1)
      const selection = removeDuplicatedFromArray([...selectedRows, ...groupSelected])

      setSelectedRows(selection)
      setLastRowSelected(null)
      return
    }

    const isAlreadySelected = selectedRows.includes(row)

    const selection = isAlreadySelected
      ? selectedRows.filter(selectedRow => selectedRow !== row)
      : [...selectedRows, row]

    setSelectedRows(selection)
  }

  const handleDelete = () => {
    const newItemsCount = tableItems.length - selectedRows.length
    const pagesDeletedCount = Math.floor(pages.length - newItemsCount / maxItems)

    changePage(pageNumber => {
      const newPageNumber = pageNumber - pagesDeletedCount

      return newPageNumber < 1 ? 1 : newPageNumber
    })

    onDelete({ selectedRows })
    clearSelection()
  }

  const selectionActions = [
    {
      id: 'delete-selected',
      onClick: handleDelete,
      disabled: selectedRows.length === 0,
      text: <Skull />
    }
  ]

  const clearSelection = () => setSelectedRows([])

  return {
    clearSelection,
    selectionActions: isEnabled ? selectionActions : [],
    tableSelectionProps: {
      onSelectionAll: isEnabled ? handleAllSelection : null,
      onSelectionChange: isEnabled ? handleSelectionChange : null,
      selectedRows
    }
  }
}
