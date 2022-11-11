import * as React from 'preact'
import { Element } from './components/Element/Element.component'
import { ListWrapper } from './List.styles'

export const List = ({ items, Child = Element }) => {
  return (
    <ListWrapper>
      {items.map((item, indexId) => {
        return <Child key={`item-${indexId}`} item={item} />
      })}
    </ListWrapper>
  )
}
