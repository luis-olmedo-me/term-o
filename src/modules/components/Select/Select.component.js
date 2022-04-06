import React, { useState, useRef, useMemo } from 'react'
import { Portal } from '../Portal/Portal.component'
import { SelectOption, SelectOptionsWrapper } from './Select.styles'

export const Select = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [bounds, setBounds] = useState({})

  console.log('bounds', bounds)

  const openSelect = (event) => {
    event.stopPropagation()

    setBounds(event.currentTarget.getBoundingClientRect())
    setIsOpen(true)
  }

  const closeSelect = (event) => {
    event.stopPropagation()

    setIsOpen(false)
  }

  const stopPropagation = (event) => {
    event.stopPropagation()
  }

  return (
    <div onMouseEnter={stopPropagation} onMouseLeave={stopPropagation}>
      <button onClick={openSelect}>:</button>

      <Portal>
        {isOpen && (
          <SelectOptionsWrapper
            style={bounds && { left: bounds.left, top: bounds.top }}
          >
            <SelectOption onClick={closeSelect}>option 1</SelectOption>
            <SelectOption onClick={closeSelect}>option 2</SelectOption>
            <SelectOption onClick={closeSelect}>option 3</SelectOption>
          </SelectOptionsWrapper>
        )}
      </Portal>
    </div>
  )
}
