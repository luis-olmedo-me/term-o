import * as React from 'preact'

import Checkbox from '../Checkbox'
import { defaultCellActions } from './Table.constants'
import { searchIn } from './Table.helpers'
import {
  HeaderCheckbox,
  TableActions,
  TableActionsWrapper,
  TableHeaderRowValue,
  TableRow,
  TableRowValue,
  TableWrapper
} from './Table.styles'

export const Table = ({
  rows,
  options,
  onSelectionChange,
  onSelectionAll,
  selectedRows,
  components = {},
  actions = [],
  actionsAlwaysVisible = false,
  createActionsPerRow
}) => {
  const hasSelectionControls = Boolean(onSelectionChange && onSelectionAll)

  const parsedColumns = hasSelectionControls
    ? [
        {
          id: 'selection',
          headerCellRenderer: 'headerCheckbox',
          cellRenderer: 'cellCheckbox',
          width: '33px',
          minTableWidth: 0,
          center: true,
          internal: false
        },
        ...options.columns
      ]
    : options.columns

  const parsedComponents = {
    ...components,
    headerCheckbox: () => (
      <HeaderCheckbox
        onChange={onSelectionAll}
        checked={rows.every(row => selectedRows.includes(row))}
      />
    ),
    cellCheckbox: ({ row }) => (
      <Checkbox
        onChange={event => onSelectionChange({ row, event })}
        checked={selectedRows.includes(row)}
      />
    )
  }

  const defaultWidth = 100 / parsedColumns.length

  return (
    <TableWrapper>
      <TableRow className="header">
        {parsedColumns.map(({ id, width, displayName, headerCellRenderer }) => {
          const HeaderCellRenderer = parsedComponents[headerCellRenderer]
          const hasFixedWidth = Boolean(width)

          return (
            <TableHeaderRowValue
              key={`header-${id}`}
              width={width || `${defaultWidth}%`}
              hasFixedWidth={hasFixedWidth}
            >
              {HeaderCellRenderer ? <HeaderCellRenderer /> : displayName}
            </TableHeaderRowValue>
          )
        })}
      </TableRow>

      {rows.map((row, rowIndex) => {
        const actionsPerRow = createActionsPerRow?.(row) || []
        const parsedActions = [...defaultCellActions, ...actions, ...actionsPerRow]

        return (
          <TableRow key={`row-${rowIndex}`}>
            {parsedColumns.map(
              ({ id, width, field, onClick, center, internal, actionIds, cellRenderer }) => {
                const value = field ? searchIn(row, field) : ''
                const onColumnClick = onClick ? () => onClick(column) : null
                const CellRenderer = parsedComponents[cellRenderer]
                const hasFixedWidth = Boolean(width)
                const cellActions = actionIds
                  ? parsedActions.filter(({ id }) => actionIds.includes(id))
                  : []

                return (
                  <TableRowValue
                    key={`${id}-${rowIndex}`}
                    onClick={onColumnClick}
                    center={center}
                    className={internal === false ? '' : 'internal'}
                    width={width || `${defaultWidth}%`}
                    hasFixedWidth={hasFixedWidth}
                  >
                    {CellRenderer ? <CellRenderer value={value} row={row} /> : value}

                    {cellActions && (
                      <TableActionsWrapper
                        className="actions"
                        actionsAlwaysVisible={actionsAlwaysVisible}
                      >
                        <TableActions actions={cellActions} eventProps={{ value, row }} />
                      </TableActionsWrapper>
                    )}
                  </TableRowValue>
                )
              }
            )}
          </TableRow>
        )
      })}
    </TableWrapper>
  )
}
