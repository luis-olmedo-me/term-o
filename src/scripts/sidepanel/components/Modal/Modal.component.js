import * as React from 'preact'
import Button from '../Button'
import * as S from './Modal.styles'

export const Modal = ({ children, onClose, open, title }) => {
  return (
    <S.ModalWrapper onClose={onClose} open={open}>
      <S.ModalHeader>
        <S.ModalHeaderTitle>{title}</S.ModalHeaderTitle>

        <Button text="x" onClick={onClose} />
      </S.ModalHeader>

      <S.ModalContent>{children}</S.ModalContent>
    </S.ModalWrapper>
  )
}

Modal.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean,
  title: String
}
