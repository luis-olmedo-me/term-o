import * as React from 'preact'
import { useState } from 'preact/hooks'

import SidePanel from '@configuration/components/SidePanel'
import FieldRenderer from '@src/components/FieldRenderer'
import useStorage from '@src/hooks/useStorage'

import { configIds, configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { sidePanelOptions } from './Preferences.constants'
import * as S from './Preferences.styles'

export const Preferences = () => {
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.FUNCTIONALITY)

  const [config] = useStorage({ key: storageKeys.CONFIG })

  const sectionSelected = config.details.find(({ id }) => id === selectedSectionId)

  const handleClicksInButtonFields = inputId => {
    if (inputId === configInputIds.RESET_DATA) {
      config.reset()
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
                key={input.id}
                description={input.description}
                value={input.value}
                inputId={input.id}
                type={input.type}
                options={input.options}
                validations={input.validations}
                postFix={input.postFix}
                name={`${sectionSelected.id}-${input.id}`}
                title={input.name}
                changeConfig={config.change.bind(config)}
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
