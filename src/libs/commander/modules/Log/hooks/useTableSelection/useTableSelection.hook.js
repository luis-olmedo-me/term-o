import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { removeDuplicatedFromArray } from '@src/helpers/utils.helpers.js'
import { Skull } from '@src/modules/icons'

export const useTableSelection = ({
  handleSkullClick,
  currentRows,
  isEnabled = true,
  tableItems,
  pages,
  changePage
}) => {
  const [selectedRows, setSelectedRows] = useState([])

  const handleAllSelection = () => {
    const areAllRowsIncluded = currentRows.every(allRow => selectedRows.includes(allRow))

    const selections = areAllRowsIncluded
      ? selectedRows.filter(selectedRow => !currentRows.includes(selectedRow))
      : removeDuplicatedFromArray([...selectedRows, ...currentRows])

    setSelectedRows(selections)
  }

  const handleSelectionChange = ({ row }) => {
    const isAlreadySelected = selectedRows.includes(row)

    const selection = isAlreadySelected
      ? selectedRows.filter(selectedRow => selectedRow !== row)
      : [...selectedRows, row]

    setSelectedRows(selection)
  }

  const handleDelete = () => {
    const newItemsCount = tableItems.length - selectedRows.length
    const pagesDeletedCount = pages.length - newItemsCount / 10

    changePage(pageNumber => {
      const newPageNumber = pageNumber - pagesDeletedCount

      return newPageNumber < 1 ? 1 : newPageNumber
    })

    handleSkullClick({ selectedRows })
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
