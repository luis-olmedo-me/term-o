import useConfig from '@src/hooks/useConfig'
import * as React from 'preact'
import FieldRenderer from '../FieldRenderer'
import Modal from '../Modal'
import * as S from './PreferencesModal.styles'

export const PreferencesModal = ({ open, onClose }) => {
  const { config } = useConfig()

  return (
    <Modal open={open} title="Preferences" onClose={onClose}>
      <div className="vertical-scroller">
        {config.map(section => {
          return (
            <>
              <div key={section.id}>
                <S.SectionTitle>{section.name}</S.SectionTitle>
                <S.Description>{section.description}</S.Description>

                {section.inputs.map(input => {
                  return (
                    <S.InputWrapper key={input.id}>
                      <S.InputTitle>{input.name}</S.InputTitle>
                      <S.Description>{input.description}</S.Description>

                      <FieldRenderer
                        value={input.value}
                        sectionId={section.id}
                        inputId={input.id}
                        type={input.type}
                      />
                    </S.InputWrapper>
                  )
                })}
              </div>
            </>
          )
        })}
      </div>
    </Modal>
  )
}

PreferencesModal.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean,
  title: String
}
