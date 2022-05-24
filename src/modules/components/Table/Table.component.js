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
        {rows.map((row, index) => (
          <TableRow key={`row-${index}`}>
            {row.map((column, index) => {
              const copyColumn = () => navigator.clipboard.writeText(column)
              const width = widths[index]

              return (
                <TableRowValue
                  key={`row-item-${index}`}
                  onClick={copyColumn}
                  width={`${width}%`}
                >
                  {parseValue ? parseValue(column, index) : column}
                </TableRowValue>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
