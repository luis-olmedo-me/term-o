import React from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'
import { Modal, ModalWrapper } from './ConsoleModal.styles'

export const ConsoleModal = ({ isOpen, children, onClickOutside }) => {
  const handleWrapperClick = () => {
    console.log('click in wrapper')
    onClickOutside?.()
  }

  const handleModalClick = (event) => {
    console.log('click in modal')
    event.stopPropagation()
  }

  return (
    <ConsolePortal>
      {isOpen && (
        <ModalWrapper onClick={handleWrapperClick}>
          <Modal onClick={handleModalClick}>{children}</Modal>
        </ModalWrapper>
      )}
    </ConsolePortal>
  )
}
