import { Warning } from './List.styles'

export const List = ({ items, warning }) => {
  const hasItems = items?.length > 0

  return (
    <ListContainer>
      {warning && <Warning>{warning}</Warning>}

      {items?.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ListContainer>
  )
}
