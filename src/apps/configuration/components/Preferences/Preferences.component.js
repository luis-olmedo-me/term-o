import * as React from 'preact'
import { useState } from 'preact/hooks'

import SidePanel from '@configuration/components/SidePanel'
import FieldRenderer from '@src/components/FieldRenderer'
import useStorage from '@src/hooks/useStorage'
import Logo from '@src/icons/Logo.icon'
import storage from '@src/libs/storage'

import { configIds, configInputIds } from '@src/constants/config.constants'
import { iconSizes } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { sidePanelOptions } from './Preferences.constants'
import * as S from './Preferences.styles'

export const Preferences = () => {
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.FUNCTIONALITY)

  const [config] = useStorage({ key: storageKeys.CONFIG })

  const sectionSelected = config.details.find(({ id }) => id === selectedSectionId)

  const handleClicksInButtonFields = inputId => {
    if (inputId === configInputIds.RESET_CONFIGURATION) {
      config.reset()
    }
    if (inputId === configInputIds.CLEAR_USER_DATA) {
      storage.reset()
    }
  }

  return (
    <S.PreferencesWrapper>
      <S.HeaderWrapper>
        <Logo size={iconSizes.NORMAL} />

        <S.HeaderTitle>Configuration</S.HeaderTitle>
      </S.HeaderWrapper>

      <S.ContentWrapper>
        <SidePanel
          options={sidePanelOptions}
          selectedOptionId={selectedSectionId}
          onChange={setSelectedSectionId}
        />

        <S.MainContentWrapper className="vertical-scroller">
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
                  iconButton={input.iconButton}
                  name={`${sectionSelected.id}-${input.id}`}
                  title={input.name}
                  changeConfig={config.change}
                  handleClickInButtons={handleClicksInButtonFields}
                />
              )
            })}
          </S.SectionWrapper>
        </S.MainContentWrapper>
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
