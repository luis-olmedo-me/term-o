import { useEffect, useRef, useState } from 'preact/hooks'

import Header from '@configuration/components/Header'
import SidePanel from '@configuration/components/SidePanel'
import FieldRenderer from '@src/components/FieldRenderer'
import useDebouncedCallback from '@src/hooks/useDebouncedCallback'
import useStorage from '@src/hooks/useStorage'
import storage from '@src/libs/storage'

import { configIds, configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { colorThemeKeys } from '@src/constants/themes.constants'
import { getConfigDetailsByInputId } from '@src/helpers/config.helpers'
import { createNotification } from '@src/helpers/web-components.helpers'
import { global__scrollable } from '@styles/global.module.scss'
import { sidePanelOptions } from './Preferences.constants'
import {
  filterSectionsBy,
  getInputMessageByType,
  getLatestSectionId,
  handleImportConfig
} from './Preferences.helpers'
import {
  preferences,
  preferences__content,
  preferences__main,
  preferences__section,
  preferences__section_description,
  preferences__section_title
} from './Preferences.module.scss'

export const Preferences = () => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const [search, setSearch] = useState('')
  const [selectedSectionId, setSelectedSectionId] = useState(configIds.FUNCTIONALITY)
  const [configSections, setConfigSections] = useState(config.details)

  const contentRef = useRef(null)

  const handleScroll = useDebouncedCallback(
    () => {
      const id = getLatestSectionId(contentRef.current)

      setSelectedSectionId(id)
    },
    [],
    100
  )

  useEffect(
    function expectForSectionsChanges() {
      const newSections = filterSectionsBy(config.details, search)

      setConfigSections(newSections)
    },
    [config.details, search]
  )

  const sendNotification = (inputName, message, color) => {
    createNotification({
      title: `Term-O | ${inputName}`,
      message,
      color,
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

      sendNotification(inputDetails.name, 'Task completed successfully!', colorThemeKeys.GREEN)
    } catch (message) {
      sendNotification(inputDetails.name, message, colorThemeKeys.RED)
    }
  }

  const handleConfigChange = (inputId, newValue) => {
    const inputDetails = getConfigDetailsByInputId(inputId)
    const oldValue = config.getValueById(inputId)
    const message = getInputMessageByType(inputDetails, oldValue, newValue)

    sendNotification(inputDetails.name, message, colorThemeKeys.GREEN)
    config.change(inputId, newValue)
  }

  const handleSidebarItemClick = newId => {
    const children = Array.from(contentRef.current.children)
    const foundChild = children.find(child => child.getAttribute('id') === newId)

    foundChild.scrollIntoView({ block: 'start', behavior: 'smooth' })
    setSelectedSectionId(newId)
  }

  const handleSearch = event => {
    const searchedValue = event.target.value.toLowerCase()

    setSearch(searchedValue)
  }

  return (
    <div className={preferences}>
      <Header onSearch={handleSearch} theme={config.theme} />

      <div className={preferences__content}>
        <SidePanel
          options={sidePanelOptions}
          selectedOptionId={selectedSectionId}
          onChange={handleSidebarItemClick}
        />

        <main
          ref={contentRef}
          onScroll={handleScroll}
          className={`${global__scrollable} ${preferences__main}`}
        >
          {configSections.map(section => {
            return (
              <section key={section.id} className={preferences__section} id={section.id}>
                <h3 className={preferences__section_title}>{section.name}</h3>

                <p className={preferences__section_description}>{section.description}</p>

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
              </section>
            )
          })}
        </main>
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
