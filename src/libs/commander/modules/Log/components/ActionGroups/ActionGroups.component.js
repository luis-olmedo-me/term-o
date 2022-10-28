import * as React from 'react'
import { DateTimePickerAction } from '../DateTimePickerAction/DateTimePickerAction.component'
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
          label,
          title
        }) => {
          const commonProps = {
            key: id,
            className: `
              ${selected ? 'selected' : ''}
              ${disabled ? 'disabled' : ''}
              ${invalid ? 'invalid' : ''}
            `,
            disabled,
            title
          }

          switch (type) {
            case 'datetime':
              return (
                <DateTimePickerAction
                  {...commonProps}
                  onChange={onChange}
                  label={label}
                  value={text}
                />
              )

            default:
              return (
                <Action {...commonProps} onClick={onClick}>
                  {text}
                </Action>
              )
          }
        }
      )}
    </Groups>
  )
}
