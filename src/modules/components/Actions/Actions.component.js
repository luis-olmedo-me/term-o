import * as React from 'preact'
import { useState } from 'preact/hooks'
import { cancelPropagation } from './Actions.helpers'
import { ActionButton, ActionButtons, ItemsWrapper } from './Actions.styles'

export const Actions = ({ actions, className, wrapperRef, Postfix, eventProps }) => {
  return (
    <ActionButtons ref={wrapperRef} className={className} hasPostfix={Boolean(Postfix)}>
      {actions.map((action, index) => {
        const [isOpen, setIsOpen] = useState(false)
        const onClick = () => action.onCLick?.({ ...eventProps })

        const items = action.items
          ? [
              {
                id: 'toggle-items',
                title: 'Toggle menu',
                onClick: () => setIsOpen(!isOpen),
                Component: '⚙️'
              },
              ...action.items.map(item => ({ ...item, hidden: !isOpen }))
            ]
          : []

        return action.items ? (
          <ItemsWrapper key={action.id}>
            {items.map(item => {
              const onItemClick = () => item.onCLick?.({ ...eventProps })

              return (
                !item.hidden && (
                  <ActionButton
                    key={item.id}
                    onClick={item.disabled ? null : cancelPropagation(onItemClick)}
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
            onClick={action.disabled ? null : cancelPropagation(onClick)}
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
