import * as React from 'react'
import { TableWrapper, TableRowValue, TableRow } from './Table.styles'

export const Table = ({ headers, rows, parseValue, widths }) => {
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
            const copyColumn = () => navigator.clipboard.writeText(column)
            const width = widths[columnIndex]

            return (
              <TableRowValue
                key={`row-column-${columnIndex}`}
                onClick={copyColumn}
                style={{ flex: width / 100 }}
              >
                {parseValue ? parseValue(row, columnIndex) : column}
              </TableRowValue>
            )
          })}
        </TableRow>
      ))}
    </TableWrapper>
  )
}
