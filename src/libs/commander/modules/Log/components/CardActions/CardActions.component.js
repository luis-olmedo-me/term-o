import * as React from 'preact'
import { DateTimePickerAction } from '../DateTimePickerAction/DateTimePickerAction.component'
import { Action, Groups, SymbolWrapper } from './CardActions.styles'

export const CardActions = ({ actions }) => {
  return (
    <Groups>
      {actions.map(
        ({ id, text, onClick, onChange, disabled, selected, invalid, type, label, title }) => {
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

            case 'symbol':
              return (
                <SymbolWrapper>
                  <span>{text}</span>
                </SymbolWrapper>
              )

            default:
              return (
                <Action {...commonProps} onClick={onClick} hasIcon={typeof text !== 'string'}>
                  {text}
                </Action>
              )
          }
        }
      )}
    </Groups>
  )
}
