import * as React from 'preact'

import useConfig from '@src/hooks/useConfig'
import FieldRenderer from '../FieldRenderer'
import * as S from './Preferences.styles'

export const Preferences = () => {
  const { config } = useConfig()

  return config.map(section => {
    return (
      <S.SectionWrapper key={section.id}>
        <S.SectionTitle>{section.name}</S.SectionTitle>
        <S.Description>{section.description}</S.Description>

        {section.inputs.map(input => {
          return (
            <S.InputsWrapper key={input.id}>
              <S.InputTitle>
                {input.name} [{input.type}]
              </S.InputTitle>

              <S.Description>{input.description}</S.Description>

              <FieldRenderer
                value={input.value}
                sectionId={section.id}
                inputId={input.id}
                type={input.type}
              />
            </S.InputsWrapper>
          )
        })}
      </S.SectionWrapper>
    )
  })
}

Preferences.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean,
  title: String
}
