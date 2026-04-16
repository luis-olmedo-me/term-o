import storage from '@src/libs/storage'

import { configIds } from '@src/constants/config.constants'
import { availableInputTypes } from '@src/constants/inputs.constants'
import { colorThemeKeys } from '@src/constants/themes.constants'
import { uploader } from '@src/helpers/file.helpers'
import { getBgColor, getColor } from '@src/helpers/themes.helpers'
import { backgroundLogo, rotationValues } from './Preferences.constants'

export const handleImportConfig = ({ onError }) => {
  return new Promise((resolve, reject) => {
    const handleError = message => {
      onError(message)
      reject(message)
    }

    const input = uploader({
      extensions: ['txt'],
      onError: handleError,
      onUpload: file => storage.import(file).catch(handleError).then(resolve)
    })

    input.open()
  })
}

export const getInputMessageByType = (input, oldValue, newValue) => {
  const colorReset = getColor(colorThemeKeys.RESET)
  const bgColorReset = getBgColor(colorThemeKeys.RESET)
  const reset = `${colorReset}${bgColorReset}`

  if (input.type === availableInputTypes.BOOLEAN) {
    const oldUIValue = oldValue ? 'On' : 'Off'
    const newUIValue = newValue ? 'On' : 'Off'

    return `${oldUIValue} -> ${newUIValue}`
  }

  if (input.type === availableInputTypes.NUMBER) {
    return `${oldValue} -> ${newValue}`
  }

  if (input.type === availableInputTypes.SELECT) {
    const oldUIValue = input.options.find(option => option.id === oldValue).name
    const newUIValue = input.options.find(option => option.id === newValue).name

    return `"${oldUIValue}" -> "${newUIValue}"`
  }

  return `"${oldValue}${reset}" -> "${newValue}${reset}"`
}

export const getLatestSectionId = sectionElementContainer => {
  const children = Array.from(sectionElementContainer.children)
  const offsetTop = sectionElementContainer.offsetTop
  const scrollTop = sectionElementContainer.scrollTop + window.innerHeight * 0.5

  children.reverse()

  let id = configIds.FUNCTIONALITY

  for (const child of children) {
    const childTop = child.offsetTop - offsetTop

    if (childTop <= scrollTop) {
      id = child.getAttribute('id')
      break
    }
  }

  return id
}

export const filterSectionsBy = (currentSections, search) => {
  return currentSections.reduce((sections, section) => {
    const matchedInputs = section.inputs.filter(input => {
      const description = input.description.toLowerCase()
      const name = input.name.toLowerCase()

      return description.includes(search) || name.includes(search)
    })

    return matchedInputs.length ? [...sections, { ...section, inputs: matchedInputs }] : sections
  }, [])
}

export const createImageBackground = theme => {
  const components = rotationValues.map(rotation => {
    return backgroundLogo
      .replace('{brightWhite}', theme.colors.brightWhite)
      .replace('{brightWhite}', theme.colors.brightWhite)
      .replace('{brightAccent}', theme.colors.brightAccent)
      .replace('{brightBlack}', theme.colors.brightBlack)
      .replace('{rotation}', rotation)
      .replace('{opacity}', theme.isDarkMode ? 0.02 : 0.04)
  })

  const urls = components
    .map(component => `url("data:image/svg+xml,${encodeURIComponent(component)}")`)
    .join(',')

  return `background-image: ${urls};`
}
