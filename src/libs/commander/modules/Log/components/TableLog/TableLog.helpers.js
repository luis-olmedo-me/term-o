export const createTableLogActions = ({ onMoveUpClick, onMoveDownClick }) => {
  return [
    {
      id: tableLogActionIds.MOVE_UP,
      title: 'Move up',
      onClick: onMoveUpClick,
      Component: <Chevron direction="top" />
    },
    {
      id: tableLogActionIds.MOVE_DOWN,
      title: 'Move down',
      onClick: onMoveDownClick,
      Component: <Chevron direction="bottom" />
    }
  ]
}
