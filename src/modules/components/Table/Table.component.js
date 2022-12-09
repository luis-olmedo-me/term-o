import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { debounce } from '@src/helpers/utils.helpers.js'
import { Checkbox } from '../Checkbox/Checkbox.component'
import { defaultCellActions } from './Table.constants'
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
  widthRef,
  components = {},
  actions = []
}) => {
  const [wrapperWidth, setWrapperWidth] = useState(0)

  useEffect(() => {
    const wrapper =
      widthRef?.current &&
      (widthRef?.current.isReactComponent ? widthRef?.current.base : widthRef?.current)

    if (!wrapper) return

    const updateWidth = debounce(() => setWrapperWidth(wrapper.clientWidth), 250)
    const obsever = new ResizeObserver(updateWidth)

    obsever.observe(wrapper)

    return () => obsever.unobserve(wrapper)
  }, [])

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
  // const rows = hasSelectionControls
  //   ? rows.map(row => {
  //       return [
  //         {
  //           id: 'selection',
  //           CellRenderer: ({ value }) => (
  //             <Checkbox
  //               onChange={event => onSelectionChange({ row, event })}
  //               checked={selectedRows.includes(row)}
  //             />
  //           )
  //         },
  //         ...row
  //       ]
  //     })
  //   : rows

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
  const parsedActions = [...defaultCellActions, ...actions]

  const minTableWidths = parsedColumns.map(column => column.minTableWidth)
  const widths = parsedColumns.map(column => column.width)
  const centerConditions = parsedColumns.map(column => column.center)

  return (
    <TableWrapper ref={widthRef}>
      <TableRow className="header">
        {parsedColumns.map(({ id, width, displayName, minTableWidth, headerCellRenderer }) => {
          const HeaderCellRenderer = parsedComponents[headerCellRenderer]
          const showColumn =
            wrapperWidth !== null && minTableWidth ? wrapperWidth > minTableWidth : true

          return (
            showColumn && (
              <TableHeaderRowValue
                key={`header-${id}`}
                width={width}
                hasFixedWidth={!width.endsWith('%')}
              >
                {HeaderCellRenderer ? <HeaderCellRenderer /> : displayName}
              </TableHeaderRowValue>
            )
          )
        })}
      </TableRow>

      {rows.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {parsedColumns.map(
            ({
              id,
              width,
              minTableWidth,
              field,
              onClick,
              center,
              internal,
              actionIds,
              cellRenderer
            }) => {
              const value = field ? searchIn(row, field) : ''
              const onColumnClick = onClick ? () => onClick(column) : null
              const showColumn =
                wrapperWidth !== null && minTableWidth ? wrapperWidth > minTableWidth : true
              const CellRenderer = parsedComponents[cellRenderer]
              const cellActions = actionIds
                ? parsedActions.filter(({ id }) => actionIds.includes(id))
                : []

              return (
                showColumn && (
                  <TableRowValue
                    key={`${id}-${rowIndex}`}
                    onClick={onColumnClick}
                    style={{ width }}
                    center={center}
                    hasFixedWidth={!width.endsWith('%')}
                    className={internal === false ? '' : 'internal'}
                  >
                    {CellRenderer ? <CellRenderer value={value} row={row} /> : value}

                    {cellActions && (
                      <TableActionsWrapper className="actions">
                        <TableActions actions={cellActions} eventProps={{ value, row }} />
                      </TableActionsWrapper>
                    )}
                  </TableRowValue>
                )
              )
            }
          )}

          {/* {row.map((column, columnIndex) => {
            const onColumnClick = () => column.onClick?.(column)

            const width = widths[columnIndex]
            const center = centerConditions[columnIndex]
            const showColumn =
              wrapperWidth !== null && minTableWidths[columnIndex]
                ? wrapperWidth > minTableWidths[columnIndex]
                : true

            return (
              showColumn && (
                <TableRowValue
                  key={`row-column-${columnIndex}`}
                  onClick={onColumnClick}
                  style={{ width }}
                  center={center}
                  hasFixedWidth={!width.endsWith('%')}
                  className={column.internal === false ? '' : 'internal'}
                >
                  {column.value}

                  {column.actions && (
                    <TableActionsWrapper className="actions">
                      <TableActions actions={column.actions} />
                    </TableActionsWrapper>
                  )}
                </TableRowValue>
              )
            )
          })} */}
        </TableRow>
      ))}
    </TableWrapper>
  )
}

export const searchIn = (reference, pathsString) => {
  const paths = pathsString.split('.')

  return paths.reduce((result, path) => result[path], reference)
}
