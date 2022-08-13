export const List = ({ items, warning }) => {
  const hasItems = items?.length > 0

  return (
    <ul style={{ margin: 0 }}>
      {warning && <li style={{ color: 'yellow' }}>{warning}</li>}

      {items?.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  )
}
