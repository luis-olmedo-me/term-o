import * as React from 'preact'
import { useState } from 'preact/hooks'

import useConfig, { configIds, defaultConfigSections } from '@src/hooks/useConfig'
import FieldRenderer from '../FieldRenderer'
import SidePanel from '../SidePanel'
import * as S from './Preferences.styles'

const sidePanelOptions = defaultConfigSections.map(section => ({
  id: section.id,
  name: section.name
}))

export const Preferences = () => {
  const { config } = useConfig()
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.GENERAL)

  const sectionSelected = config.find(({ id }) => id === selectedSectionId)

  return (
    <S.PreferencesWrapper>
      <SidePanel
        options={sidePanelOptions}
        selectedOptionId={selectedSectionId}
        onChange={setSelectedSectionId}
      />

      <S.ContentWrapper className="vertical-scroller">
        <S.SectionWrapper key={sectionSelected.id}>
          <S.SectionTitle>{sectionSelected.name}</S.SectionTitle>
          <S.SectionDescription>{sectionSelected.description}</S.SectionDescription>

          {sectionSelected.inputs.map(input => {
            return (
              <S.InputsWrapper key={input.id}>
                <S.InputTitle>
                  {input.name} [{input.type}]
                </S.InputTitle>

                <S.Description>{input.description}</S.Description>

                <FieldRenderer
                  value={input.value}
                  sectionId={sectionSelected.id}
                  inputId={input.id}
                  type={input.type}
                  options={input.options}
                />
              </S.InputsWrapper>
            )
          })}
        </S.SectionWrapper>
      </S.ContentWrapper>
    </S.PreferencesWrapper>
  )
}

Preferences.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean,
  title: String
}
