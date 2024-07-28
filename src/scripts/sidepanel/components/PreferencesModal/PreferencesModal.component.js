import useConfig from '@src/hooks/useConfig'
import * as React from 'preact'
import Input from '../Input'
import Modal from '../Modal'
import * as S from './PreferencesModal.styles'

export const PreferencesModal = ({ open, onClose }) => {
  const { config, changeConfig } = useConfig()

  const inputs = {
    text: ({ value, sectionId, inputId }) => (
      <Input
        value={value}
        onChange={({ target }) => changeConfig(sectionId, inputId, target.value)}
      />
    ),
    default: () => <span>Default Input</span>
  }

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
                  const InputComponent = inputs[input.type] || inputs.default

                  return (
                    <S.InputWrapper key={input.id}>
                      <S.InputTitle>{input.name}</S.InputTitle>
                      <S.Description>{input.description}</S.Description>

                      <InputComponent
                        value={input.value}
                        sectionId={section.id}
                        inputId={input.id}
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
