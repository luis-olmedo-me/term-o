import React from 'react'

export const Table = ({ headers, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={`header-${header}`}>{header}</th>
          ))}
        </tr>
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
    </table>
  )
}
