import * as React from 'preact'
import Modal from '../Modal'
import * as S from './PreferencesModal.styles'

export const PreferencesModal = ({ open, onClose }) => {
  return (
    <Modal open={open} title="Preferences" onClose={onClose}>
      <S.PreferencesModalWrapper>test</S.PreferencesModalWrapper>
    </Modal>
  )
}

PreferencesModal.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean,
  title: String
}
