import * as React from 'preact'
import { useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'

import { configIds } from '@src/constants/config.constants'
import FieldRenderer from '../FieldRenderer'
import SidePanel from '../SidePanel'
import { sidePanelOptions } from './Preferences.constants'
import * as S from './Preferences.styles'

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
              <S.ConfigInputWrapper key={input.id}>
                <S.ConfigInputTitle>
                  {input.name} [{input.type}]
                </S.ConfigInputTitle>

                <S.ConfigInputDescription>{input.description}</S.ConfigInputDescription>

                <FieldRenderer
                  value={input.value}
                  sectionId={sectionSelected.id}
                  inputId={input.id}
                  type={input.type}
                  options={input.options}
                  postFix={input.postFix}
                  name={`${sectionSelected.id}-${input.id}`}
                />
              </S.ConfigInputWrapper>
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
