import React, { useState } from 'react'
import { ActionButton, ActionButtons, ItemsWrapper } from './Actions.styles'

export const Actions = ({ wrapperRef, actions }) => {
  return (
    <ActionButtons ref={wrapperRef}>
      {actions.map((action) => {
        const [isOpen, setIsOpen] = useState(false)

        const handleToggleItems = (event) => {
          event.stopPropagation()
        }

        const items = action.items
          ? [
              {
                id: 'toggle-items',
                title: 'Toggle menu',
                onClick: handleToggleItems,
                Component: isOpen ? '⚙>' : '⚙'
              },
              ...action.items.map((item) => ({
                ...item,
                hidden: !isOpen
              }))
            ]
          : []

        return action.items ? (
          <ItemsWrapper
            key={action.id}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {items.map((item) => {
              return (
                !item.hidden && (
                  <ActionButton
                    key={item.id}
                    onClick={item.disabled ? null : item.onClick}
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
            onClick={action.disabled ? null : action.onClick}
            title={action.title}
            disabled={action.disabled}
          >
            {action.Component}
          </ActionButton>
        )
      })}
    </ActionButtons>
  )
}
