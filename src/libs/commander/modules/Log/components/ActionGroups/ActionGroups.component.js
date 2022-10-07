import * as React from 'react'
import { DatePickerAction } from '../DatePickerAction/DatePickerAction.component'
import { Action, Groups } from './ActionGroups.styles'

export const ActionGroups = ({ actionGroups }) => {
  return (
    <Groups>
      {actionGroups.map(
        ({
          id,
          text,
          onClick,
          onChange,
          disabled,
          selected,
          invalid,
          type,
          label
        }) => {
          const commonProps = {
            key: id,
            className: `
              ${selected ? 'selected' : ''}
              ${disabled ? 'disabled' : ''}
              ${invalid ? 'invalid' : ''}
            `,
            disabled,
            value: text
          }

          switch (type) {
            case 'datetime':
              return (
                <DatePickerAction
                  {...commonProps}
                  onChange={onChange}
                  label={label}
                />
              )

            default:
              return <Action {...commonProps} onClick={onClick} type='button' />
          }
        }
      )}
    </Groups>
  )
}
