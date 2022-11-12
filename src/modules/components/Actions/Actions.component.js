import * as React from 'preact'
import { useState } from 'preact/hooks'
import { cancelPropagation } from './Actions.helpers'
import { ActionButton, ActionButtons, ItemsWrapper } from './Actions.styles'

export const Actions = ({ actions, className, wrapperRef, Postfix }) => {
  return (
    <ActionButtons
      ref={wrapperRef}
      className={className}
      hasPostfix={Boolean(Postfix)}
    >
      {actions.map((action, index) => {
        const [isOpen, setIsOpen] = useState(false)

        const items = action.items
          ? [
              {
                id: 'toggle-items',
                title: 'Toggle menu',
                onClick: () => setIsOpen(!isOpen),
                Component: '⚙️'
              },
              ...action.items.map((item) => ({ ...item, hidden: !isOpen }))
            ]
          : []

        return action.items ? (
          <ItemsWrapper key={action.id}>
            {items.map((item) => {
              return (
                !item.hidden && (
                  <ActionButton
                    key={item.id}
                    onClick={
                      item.disabled ? null : cancelPropagation(item.onClick)
                    }
                    disabled={item.disabled}
                    title={item.title}
                  >
                    {item.Component}
                  </ActionButton>
                )
              )
            })}
          </ItemsWrapper>
        ) : (
          <ActionButton
            key={action.id}
            onClick={action.disabled ? null : cancelPropagation(action.onClick)}
            title={action.title}
            disabled={action.disabled}
            isLastItem={index === actions.length - 1}
          >
            {action.Component}
          </ActionButton>
        )
      })}

      {Postfix && <Postfix />}
    </ActionButtons>
  )
}
