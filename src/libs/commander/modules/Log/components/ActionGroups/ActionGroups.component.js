import { Action, Groups } from './ActionGroups.styles'

export const ActionGroups = ({ actionGroups }) => {
  return (
    <Groups>
      {actionGroups.map(({ id, text, onClick, disabled, selected, type }) => {
        return (
          <Action
            key={id}
            onClick={onClick}
            className={`
            ${selected ? 'selected' : ''}
            ${disabled ? 'disabled' : ''}
          `}
            disabled={disabled}
            value={text}
            type={type || 'button'}
          />
        )
      })}
    </Groups>
  )
}
