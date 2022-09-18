import React from 'react'
import { ListContainer, Warning } from './SimpleList.styles'

export const SimpleList = ({ items, warning }) => {
  return (
    <ListContainer>
      {warning && <Warning>{warning}</Warning>}

      {items?.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ListContainer>
  )
}
