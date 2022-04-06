import React, { useState, useEffect } from 'react'
import { Portal } from '../Portal/Portal.component'
import { SelectOption, SelectOptionsWrapper, Trigger } from './Select.styles'

export const Select = ({ triggerInlineStyles, optionInlineStyles }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [bounds, setBounds] = useState({})

  useEffect(
    function closeSelectWhenUserClicksOutside() {
      if (!isOpen) return

      const handleClickOutside = () => {
        setIsOpen(false)
      }

      window.addEventListener('click', handleClickOutside)
      window.addEventListener('open-term-o-select', handleClickOutside)

      return () => {
        window.removeEventListener('click', handleClickOutside)
        window.removeEventListener('open-term-o-select', handleClickOutside)
      }
    },
    [isOpen]
  )

  const openSelect = (event) => {
    event.stopPropagation()

    const openSelectEvent = new Event('open-term-o-select')

    setBounds(event.currentTarget.getBoundingClientRect())
    setIsOpen(true)

    dispatchEvent(openSelectEvent)
  }

  const closeSelect = (event) => {
    event.stopPropagation()

    setIsOpen(false)
  }

  const stopPropagation = (event) => {
    event.stopPropagation()
  }

  return (
    <>
      <Trigger triggerInlineStyles={triggerInlineStyles} onClick={openSelect}>
        :
      </Trigger>

      <Portal>
        {isOpen && (
          <SelectOptionsWrapper
            style={bounds && { left: bounds.left, top: bounds.top }}
          >
            <SelectOption
              onClick={closeSelect}
              optionInlineStyles={optionInlineStyles}
            >
              option 1
            </SelectOption>
            <SelectOption
              onClick={closeSelect}
              optionInlineStyles={optionInlineStyles}
            >
              option 2
            </SelectOption>
            <SelectOption
              onClick={closeSelect}
              optionInlineStyles={optionInlineStyles}
            >
              option 3
            </SelectOption>
          </SelectOptionsWrapper>
        )}
      </Portal>
    </>
  )
}
