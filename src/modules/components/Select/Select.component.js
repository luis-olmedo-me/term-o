import React, { useState } from 'react'
import { Portal } from '../Portal/Portal.component'

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
          <div>
            <p onClick={closeSelect}>option 1</p>
            <p onClick={closeSelect}>option 2</p>
            <p onClick={closeSelect}>option 3</p>
          </div>
        )}
      </Portal>
    </div>
  )
}
