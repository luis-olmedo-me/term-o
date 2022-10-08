import * as React from 'react'
import {
  TableWrapper,
  TableRowValue,
  TableRow,
  TableActions
} from './Table.styles'

export const Table = ({ headers, rows, widths }) => {
  return (
    <TableWrapper>
      <TableRow header>
        {headers.map((header, index) => {
          const width = widths[index]

          return (
            <span key={`header-${header}`} style={{ flex: width / 100 }}>
              {header}
            </span>
          )
        })}
      </TableRow>

      {rows.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {row.map((column, columnIndex) => {
            const onColumnClick = () => column.onClick?.(column)
            const width = widths[columnIndex]

            return (
              <TableRowValue
                key={`row-column-${columnIndex}`}
                onClick={onColumnClick}
                style={{ flex: width / 100 }}
              >
                {column.value}

                {column.actions && <TableActions actions={column.actions} />}
              </TableRowValue>
            )
          })}
        </TableRow>
      ))}
    </TableWrapper>
  )
}
