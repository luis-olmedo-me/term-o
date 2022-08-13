import React from 'react'
import {
  TableHeaderRow,
  TableWrapper,
  TableRowValue,
  TableBody,
  TableRow
} from './Table.styles'

export const Table = ({ headers, rows, parseValue, widths }) => {
  return (
    <TableWrapper>
      <thead>
        <TableHeaderRow>
          {headers.map((header, index) => {
            const width = widths[index]

            return (
              <th key={`header-${header}`} width={`${width}%`}>
                {header}
              </th>
            )
          })}
        </TableHeaderRow>
      </thead>

      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {row.map((column, columnIndex) => {
              const copyColumn = () => navigator.clipboard.writeText(column)
              const width = widths[columnIndex]

              return (
                <TableRowValue
                  key={`row-column-${columnIndex}`}
                  onClick={copyColumn}
                  width={`${width}%`}
                >
                  {parseValue ? parseValue(row, columnIndex) : column}
                </TableRowValue>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
