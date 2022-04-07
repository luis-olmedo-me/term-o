import React, { useState, useEffect } from 'react'
import { Portal } from '../Portal/Portal.component'
import {
  SelectDefaultOption,
  SelectOptionsWrapper,
  DefaultTrigger
} from './Select.styles'

export const Select = ({
  Option = SelectDefaultOption,
  ButtonTrigger = DefaultTrigger,
  className,
  options
}) => {
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

  return (
    <div className={className}>
      <ButtonTrigger onClick={openSelect}>:</ButtonTrigger>

      <Portal>
        {isOpen && (
          <SelectOptionsWrapper
            style={bounds && { left: bounds.left, top: bounds.top }}
          >
            {options.map(({ id, displayText, onClick }) => {
              const handleClick = (event) => {
                event.stopPropagation()

                onClick()
                setIsOpen(false)
              }

              return (
                <Option key={id} onClick={handleClick}>
                  {displayText}
                </Option>
              )
            })}
          </SelectOptionsWrapper>
        )}
      </Portal>
    </div>
  )
}
