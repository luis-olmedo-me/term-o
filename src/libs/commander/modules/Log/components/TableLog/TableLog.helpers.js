export const createTableLogActions = () => {
  return [
    {
      id: tableLogActionIds.MOVE_UP,
      title: 'Move up',
      onClick: ({ value }) => console.log(value),
      Component: <Chevron direction="top" />
    },
    {
      id: tableLogActionIds.MOVE_DOWN,
      title: 'Move down',
      onClick: ({ value }) => console.log(value),
      Component: <Chevron direction="bottom" />
    }
  ]
}
