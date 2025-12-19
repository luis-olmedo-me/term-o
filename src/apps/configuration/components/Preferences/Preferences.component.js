import * as React from 'preact'
import { useState } from 'preact/hooks'

import SidePanel from '@configuration/components/SidePanel'
import FieldRenderer from '@src/components/FieldRenderer'
import useStorage from '@src/hooks/useStorage'
import Logo from '@src/icons/Logo.icon'
import storage from '@src/libs/storage'

import { createNotification } from '@src/apps/content/helpers/web-components.helpers'
import { configIds, configInputIds } from '@src/constants/config.constants'
import { iconSizes } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { durations } from '@src/constants/web-elements.constants'
import { getConfigDetailsByInputId } from '@src/helpers/config.helpers'
import { sidePanelOptions } from './Preferences.constants'
import { getInputMessageByType, handleImportConfig } from './Preferences.helpers'
import * as S from './Preferences.styles'

export const Preferences = () => {
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.FUNCTIONALITY)

  const [config] = useStorage({ key: storageKeys.CONFIG })

  const sectionSelected = config.details.find(({ id }) => id === selectedSectionId)

  const sendNotification = (inputName, message) => {
    createNotification({
      title: `Term-O | ${inputName}`,
      message,
      theme: config.theme,
      duration: durations.QUICK
    })
  }

  const handleClicksInButtonFields = async (inputId, onError) => {
    const inputDetails = getConfigDetailsByInputId(inputId)

    onError(null)

    try {
      if (inputId === configInputIds.CLEAR_USER_DATA) storage.reset()
      if (inputId === configInputIds.RESET_CONFIGURATION) config.reset()
      if (inputId === configInputIds.EXPORT_CONFIGURATION) storage.export()
      if (inputId === configInputIds.IMPORT_CONFIGURATION) await handleImportConfig({ onError })

      sendNotification(inputDetails.name, 'Task completed successfully!')
    } catch (message) {
      sendNotification(inputDetails.name, message)
    }
  }

  const handleConfigChange = (inputId, newValue) => {
    const inputDetails = getConfigDetailsByInputId(inputId)
    const oldValue = config.getValueById(inputId)
    const message = getInputMessageByType(inputDetails, oldValue, newValue)

    sendNotification(inputDetails.name, message)
    config.change(inputId, newValue)
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
                  changeConfig={handleConfigChange}
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
