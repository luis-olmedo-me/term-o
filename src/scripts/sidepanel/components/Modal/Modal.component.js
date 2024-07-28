import * as React from 'preact'
import * as S from './Modal.styles'

export const Modal = ({ children, onClose, open }) => {
  return (
    <S.ModalWrapper onClose={onClose} open={open}>
      {children}
    </S.ModalWrapper>
  )
}

Modal.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean
}
