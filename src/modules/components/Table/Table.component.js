import React from 'react'
import { TableHeaderRow, TableWrapper, TableRowValue } from './Table.styles'

export const Table = ({ headers, rows, parseValue }) => {
  return (
    <TableWrapper>
      <thead>
        <TableHeaderRow>
          {headers.map((header) => (
            <th key={`header-${header}`}>{header}</th>
          ))}
        </TableHeaderRow>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={`row-${index}`}>
            {row.map((column, index) => {
              const copyColumn = () => navigator.clipboard.writeText(column)

              return (
                <TableRowValue key={`row-item-${index}`} onClick={copyColumn}>
                  {parseValue ? parseValue(column, index) : column}
                </TableRowValue>
              )
            })}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  )
}
