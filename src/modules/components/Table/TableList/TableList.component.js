import React from 'react'
import { ListContainer, Warning } from './TableList.styles'

export const TableList = ({ items, warning }) => {
  return (
    <ListContainer>
      {warning && <Warning>{warning}</Warning>}

      {items?.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ListContainer>
  )
}
