import * as React from 'react'
import { removeDuplicatedFromArray } from 'src/helpers/utils.helpers.js'
import { Skull } from 'src/modules/icons/Skull.icon'

export const useTableSelection = ({
  handleDelete,
  currentRows,
  isEnabled = true
}) => {
  const [selectedRows, setSelectedRows] = React.useState([])

  const handleAllSelection = () => {
    const areAllRowsIncluded = currentRows.every((allRow) =>
      selectedRows.includes(allRow)
    )

    const selections = areAllRowsIncluded
      ? selectedRows.filter((selectedRow) => !currentRows.includes(selectedRow))
      : removeDuplicatedFromArray([...selectedRows, ...currentRows])

    setSelectedRows(selections)
  }

  const handleSelectionChange = ({ row }) => {
    const isAlreadySelected = selectedRows.includes(row)

    const selection = isAlreadySelected
      ? selectedRows.filter((selectedRow) => selectedRow !== row)
      : [...selectedRows, row]

    setSelectedRows(selection)
  }

  const selectionActions = isEnabled
    ? [
        {
          id: 'delete-selected',
          onClick: handleDelete,
          disabled: selectedRows.length === 0,
          text: <Skull />
        }
      ]
    : []

  return {
    selectedRows,
    setSelectedRows,
    handleAllSelection,
    handleSelectionChange,
    selectionActions
  }
}
