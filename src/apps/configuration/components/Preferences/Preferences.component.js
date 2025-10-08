import * as React from 'preact'
import { useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'

import { configIds, configInputIds } from '@src/constants/config.constants'
import { useTheme } from 'styled-components'
import FieldRenderer from '../FieldRenderer'
import SidePanel from '../SidePanel'
import { sidePanelOptions } from './Preferences.constants'
import * as S from './Preferences.styles'

export const Preferences = () => {
  const { config, changeConfig, resetConfig } = useConfig()
  const theme = useTheme()
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.FUNCTIONALITY)

  const sectionSelected = config.find(({ id }) => id === selectedSectionId)

  const handleClicksInButtonFields = (sectionId, inputId) => {
    if (sectionId === configIds.DATA && inputId === configInputIds.RESET_DATA) {
      resetConfig()
    }
  }

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
              <FieldRenderer
                key={`${input.id}-${theme.colors.name}`}
                description={input.description}
                value={input.value}
                sectionId={sectionSelected.id}
                inputId={input.id}
                type={input.type}
                options={input.options}
                validations={input.validations}
                postFix={input.postFix}
                name={`${sectionSelected.id}-${input.id}`}
                title={input.name}
                changeConfig={changeConfig}
                handleClickInButtons={handleClicksInButtonFields}
              />
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
