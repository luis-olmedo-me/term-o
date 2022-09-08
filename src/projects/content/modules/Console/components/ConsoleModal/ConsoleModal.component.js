import React from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'
import { Modal, ModalWrapper, Content, Title } from './ConsoleModal.styles'

export const ConsoleModal = ({ isOpen, children, onClickOutside, title }) => {
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
          <Modal onClick={handleModalClick}>
            {title && <Title>{title}</Title>}

            <Content>{children}</Content>
          </Modal>
        </ModalWrapper>
      )}
    </ConsolePortal>
  )
}
