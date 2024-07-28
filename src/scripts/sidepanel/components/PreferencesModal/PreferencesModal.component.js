import { configSections } from '@src/hooks/useConfig/useConfig.constants'
import * as React from 'preact'
import Input from '../Input'
import Modal from '../Modal'
import * as S from './PreferencesModal.styles'

export const PreferencesModal = ({ open, onClose }) => {
  const inputs = {
    text: ({ value }) => <Input value={value} />,
    default: () => <span>Default Input</span>
  }

  return (
    <Modal open={open} title="Preferences" onClose={onClose}>
      <div className="vertical-scroller">
        {configSections.map(section => {
          return (
            <>
              <div key={section.id}>
                <S.SectionTitle>{section.name}</S.SectionTitle>
                <S.Description>{section.description}</S.Description>

                {section.inputs.map(input => {
                  const InputComponent = inputs[input.type] || inputs.default

                  return (
                    <S.InputWrapper key={input.id}>
                      <S.InputTitle>{input.name}</S.InputTitle>
                      <S.Description>{input.description}</S.Description>

                      <InputComponent value={input.value} />
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
