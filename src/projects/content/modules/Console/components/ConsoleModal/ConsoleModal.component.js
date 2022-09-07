import React from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'
import { Modal, ModalWrapper } from './ConsoleModal.styles'

export const ConsoleModal = ({ isOpen, children }) => {
  return (
    <ConsolePortal>
      {isOpen && (
        <ModalWrapper>
          <Modal>{children}</Modal>
        </ModalWrapper>
      )}
    </ConsolePortal>
  )
}
