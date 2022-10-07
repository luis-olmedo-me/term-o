import * as React from 'react'
import { DatePickerAction } from '../DatePickerAction/DatePickerAction.component'
import { Action, Groups } from './ActionGroups.styles'

export const ActionGroups = ({ actionGroups }) => {
  return (
    <Groups>
      {actionGroups.map(
        ({ id, text, onClick, onChange, disabled, selected, type, label }) => {
          const commonProps = {
            key: id,
            className: `
              ${selected ? 'selected' : ''}
              ${disabled ? 'disabled' : ''}
            `,
            disabled,
            label,
            value: text
          }

          switch (type) {
            case 'datetime':
              return <DatePickerAction {...commonProps} onChange={onChange} />

            default:
              return <Action {...commonProps} onClick={onClick} type='button' />
          }
        }
      )}
    </Groups>
  )
}
