import React from 'react'
import { TableHeaderRow, TableWrapper } from './Table.styles'

export const Table = ({ headers, rows }) => {
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
            {row.map((column, index) => (
              <td key={`row-item-${index}`}>{column}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  )
}
