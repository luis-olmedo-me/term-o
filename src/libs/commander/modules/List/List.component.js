import * as React from 'react'
import { ListWrapper } from './List.styles'
import { Element } from './components/Element/Element.component'

export const List = ({ items, Child = Element }) => {
  return (
    <ListWrapper>
      {items.map((item, indexId) => {
        return <Child key={`item-${indexId}`} item={item} />
      })}
    </ListWrapper>
  )
}
