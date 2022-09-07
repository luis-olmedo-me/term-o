import React from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'
import { Modal, ModalWrapper } from './ConsoleModal.styles'

export const ConsoleModal = ({ isOpen, children, onClickOutside }) => {
  const handleWrapperClick = () => {
    onClickOutside?.()
  }

  const handleModalClick = (event) => {
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
