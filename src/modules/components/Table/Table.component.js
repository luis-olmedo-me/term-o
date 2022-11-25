import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { debounce } from '@src/helpers/utils.helpers.js'
import { Checkbox } from '../Checkbox/Checkbox.component'
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
  widthRef
}) => {
  const [wrapperWidth, setWrapperWidth] = useState(0)

  useEffect(() => {
    const wrapper = widthRef?.current

    if (!wrapper) return

    const updateWidth = debounce(() => setWrapperWidth(wrapper.clientWidth), 250)
    const obsever = new ResizeObserver(updateWidth)

    obsever.observe(wrapper)

    return () => obsever.unobserve(wrapper)
  }, [])

  const hasSelectionControls = Boolean(onSelectionChange && onSelectionAll)

  const parsedHeaders = hasSelectionControls
    ? [
        {
          id: 'selection',
          displayName: (
            <HeaderCheckbox
              onChange={onSelectionAll}
              checked={rows.every(row => selectedRows.includes(row))}
            />
          ),
          width: '33px',
          minTableWidth: 0,
          center: true,
          internal: false
        },
        ...options.columns
      ]
    : options.columns
  const parsedRows = hasSelectionControls
    ? rows.map(row => {
        return [
          {
            id: 'selection',
            value: (
              <Checkbox
                onChange={() => onSelectionChange({ row })}
                checked={selectedRows.includes(row)}
              />
            ),
            width: '33px',
            minTableWidth: 0,
            center: true,
            internal: false
          },
          ...row
        ]
      })
    : rows

  const minTableWidths = parsedHeaders.map(column => column.minTableWidth)
  const widths = parsedHeaders.map(column => column.width)
  const centerConditions = parsedHeaders.map(column => column.center)

  return (
    <TableWrapper ref={widthRef}>
      <TableRow className="header">
        {parsedHeaders.map(({ id, width, displayName, minTableWidth }) => {
          const showColumn =
            wrapperWidth !== null && minTableWidth ? wrapperWidth > minTableWidth : true

          return (
            showColumn && (
              <TableHeaderRowValue
                key={`header-${id}`}
                width={width}
                hasFixedWidth={!width.endsWith('%')}
              >
                {displayName}
              </TableHeaderRowValue>
            )
          )
        })}
      </TableRow>

      {parsedRows.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {row.map((column, columnIndex) => {
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
          })}
        </TableRow>
      ))}
    </TableWrapper>
  )
}
