import React, { useState } from 'react'
import { Portal } from '../Portal/Portal.component'
import { SelectOption, SelectOptionsWrapper } from './Select.styles'

export const Select = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openSelect = (event) => {
    event.stopPropagation()

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
          <SelectOptionsWrapper>
            <SelectOption onClick={closeSelect}>option 1</SelectOption>
            <SelectOption onClick={closeSelect}>option 2</SelectOption>
            <SelectOption onClick={closeSelect}>option 3</SelectOption>
          </SelectOptionsWrapper>
        )}
      </Portal>
    </div>
  )
}
