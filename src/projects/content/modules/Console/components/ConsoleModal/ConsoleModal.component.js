import React from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'
import { Modal, ModalWrapper } from './ConsoleModal.styles'

export const ConsoleModal = ({ isOpen }) => {
  return (
    <ConsolePortal>
      {isOpen && (
        <ModalWrapper>
          <Modal>
            <p>test</p>
          </Modal>
        </ModalWrapper>
      )}
    </ConsolePortal>
  )
}
