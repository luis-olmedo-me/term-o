import { useRef, useState } from 'preact/hooks'

import SidePanel from '@configuration/components/SidePanel'
import FieldRenderer from '@src/components/FieldRenderer'
import useDebouncedCallback from '@src/hooks/useDebouncedCallback'
import useStorage from '@src/hooks/useStorage'
import Logo from '@src/icons/Logo.icon'
import storage from '@src/libs/storage'

import Input, { inputTypes, inputVariants } from '@src/components/Input'
import { configIds, configInputIds } from '@src/constants/config.constants'
import { iconSizes } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { getConfigDetailsByInputId } from '@src/helpers/config.helpers'
import { createNotification } from '@src/helpers/web-components.helpers'
import { verticalScroller } from '@styles/global.module.scss'
import { sidePanelOptions } from './Preferences.constants'
import {
  getInputMessageByType,
  getLatestSectionId,
  handleImportConfig
} from './Preferences.helpers'
import {
  contentWrapper,
  headerWrapper,
  mainContentWrapper,
  preferencesWrapper,
  searchInput,
  sectionDescription,
  sectionTitle,
  sectionWrapper
} from './Preferences.module.scss'

export const Preferences = () => {
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.FUNCTIONALITY)

  const contentRef = useRef(null)

  const [config] = useStorage({ key: storageKeys.CONFIG })

  const handleScroll = useDebouncedCallback(
    () => {
      const id = getLatestSectionId(contentRef.current)

      setSelectedSectionId(id)
    },
    [],
    100
  )

  const sendNotification = (inputName, message) => {
    createNotification({
      title: `Term-O | ${inputName}`,
      message,
      theme: config.theme
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

  const handleSidebarItemClick = newId => {
    const children = Array.from(contentRef.current.children)
    const foundChild = children.find(child => child.getAttribute('id') === newId)

    foundChild.scrollIntoView({ block: 'start', behavior: 'smooth' })
    setSelectedSectionId(newId)
  }

  return (
    <div className={preferencesWrapper}>
      <header className={headerWrapper}>
        <Logo size={iconSizes.NORMAL} />

        <Input
          fullWidth
          name="config-search"
          onChange={({ target }) => console.log(target.value)}
          type={inputTypes.TEXT}
          variant={inputVariants.OUTLINED}
          placeholder="Search settings..."
          className={searchInput}
        />
      </header>

      <div className={contentWrapper}>
        <SidePanel
          options={sidePanelOptions}
          selectedOptionId={selectedSectionId}
          onChange={handleSidebarItemClick}
        />

        <div
          ref={contentRef}
          className={`${mainContentWrapper} ${verticalScroller}`}
          onScroll={handleScroll}
        >
          {config.details.map(section => {
            return (
              <div key={section.id} className={sectionWrapper} id={section.id}>
                <h3 className={sectionTitle}>{section.name}</h3>
                <p className={sectionDescription}>{section.description}</p>

                {section.inputs.map(input => {
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
                      name={`${section.id}-${input.id}`}
                      title={input.name}
                      changeConfig={handleConfigChange}
                      handleClickInButtons={handleClicksInButtonFields}
                      sendNotification={sendNotification}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Preferences.propTypes = {
  children: Array,
  onClose: Function,
  open: Boolean,
  title: String
}
