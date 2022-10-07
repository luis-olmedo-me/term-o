import * as React from 'react'
import { Action, Groups } from './ActionGroups.styles'

export const ActionGroups = ({ actionGroups }) => {
  return (
    <Groups>
      {actionGroups.map(
        ({ id, text, onClick, onChange, disabled, selected, type }) => {
          const commonProps = {
            key: id,
            className: `
              ${selected ? 'selected' : ''}
              ${disabled ? 'disabled' : ''}
            `,
            disabled,
            type,
            value: text
          }

          switch (type) {
            case 'date':
              return <Action {...commonProps} onChange={onChange} />

            default:
              return <Action {...commonProps} onClick={onClick} type='button' />
          }
        }
      )}
    </Groups>
  )
}
