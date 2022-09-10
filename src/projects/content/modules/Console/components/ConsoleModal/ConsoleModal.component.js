import React, { useEffect } from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'
import { Modal, ModalWrapper, Content, Title } from './ConsoleModal.styles'

export const ConsoleModal = ({
  isOpen,
  children,
  onExit,
  title,
  titleProps = {}
}) => {
  const handleWrapperClick = () => {
    onExit?.()
  }

  const handleModalClick = (event) => {
    event.stopPropagation()
  }

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === 'Escape') {
        onExit?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onExit])

  return (
    <ConsolePortal>
      {isOpen && (
        <ModalWrapper onClick={handleWrapperClick}>
          <Modal
            onClick={handleModalClick}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {title && <Title {...titleProps}>{title}</Title>}

            <Content>{children}</Content>
          </Modal>
        </ModalWrapper>
      )}
    </ConsolePortal>
  )
}
